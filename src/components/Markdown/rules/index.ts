import { defaultRules, ParserRules } from 'simple-markdown';

import checkList from './checkList';
import del from './del';
import heading from './heading';
import inlineCode from './inlineCode';
import link from './link';
import paragraph from './paragraph';
import strong from './strong';
import text from './text';

const rules: ParserRules = {
	...defaultRules,
	paragraph,
	link,
	text,
	strong,
	del,
	heading,
	checkList,
	inlineCode,
};

export default rules;
