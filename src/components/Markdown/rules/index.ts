import { defaultRules, ParserRules } from 'simple-markdown';

import checkList from './checkList';
import del from './del';
import heading from './heading';
import paragraph from './paragraph';
import strong from './strong';
import text from './text';

const rules: ParserRules = {
	...defaultRules,
	paragraph,
	text,
	strong,
	del,
	heading,
	checkList,
};

export default rules;
