#! /usr/bin/env node

import programm from 'commander';

programm.version('1.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig>, <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);
