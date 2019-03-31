#! /usr/bin/env node

import programm from 'commander';
import gendiff from '..';

programm.version('1.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig, outputformat) => {
    console.log(gendiff(firstConfig, secondConfig, outputformat));
  })
  .option('-f, --format [type]', 'Output format', 'pretty')
  .parse(process.argv);
