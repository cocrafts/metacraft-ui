terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "3.26.0"
    }
    random = {
      source = "hashicorp/random"
      version = "3.0.1"
    }
  }

  backend "s3" {
    bucket = "storm-terraform-states"
    key = "metacraft-ui"
    region = "ap-southeast-1"
  }
}

provider "aws" {
  region = "ap-southeast-1"
}

locals {
  originId = "ui-kit-s3"
}

resource "aws_s3_bucket" "app" {
  bucket = "metacraft-ui"

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}

resource "aws_cloudfront_distribution" "app" {
  enabled = true
  is_ipv6_enabled = true
  default_root_object = "index.html"
  aliases = ["kit.stormgate.io"]

  origin {
    domain_name = aws_s3_bucket.app.bucket_regional_domain_name
    origin_id = local.originId
  }

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    viewer_protocol_policy = "redirect-to-https"
    target_origin_id = local.originId

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  custom_error_response {
    error_code = 403
    error_caching_min_ttl = 10
    response_page_path = "/master/index.html"
    response_code = 200
  }

  custom_error_response {
    error_code = 404
    error_caching_min_ttl = 10
    response_page_path = "/master/index.html"
    response_code = 200
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    ssl_support_method = "sni-only"
    acm_certificate_arn = "{{{sslArn}}}"
  }
}

output "cloudFrontId" {
  value = aws_cloudfront_distribution.app.id
}
