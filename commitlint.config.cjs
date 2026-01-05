export default {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: {
        'jira-ticket': (parsed) => {
          const { subject } = parsed;
          const ticketPattern = /^(\b[A-Z]+-\d+\b\s+)?(.+)$/;

          if (!subject) {
            return [false, 'commit message subject is required'];
          }

          const match = subject.match(ticketPattern);

          if (!match) {
            return [false, 'invalid commit message format'];
          }

          const [, ticketWithSpace, description] = match;

          if (ticketWithSpace) {
            const ticket = ticketWithSpace.trim();
            if (!/^[A-Z]+-\d+$/.test(ticket)) {
              return [false, 'invalid Jira ticket format (e.g., PROJ-123)'];
            }
          }

          if (!description || description.trim().length < 3) {
            return [false, 'commit message must include a description'];
          }

          if (description !== description.toLowerCase()) {
            return [false, 'description must be in lowercase'];
          }

          return [true];
        },
      },
    },
  ],
  rules: {
    'jira-ticket': [2, 'always'],
    'subject-case': [0], // Disable the default subject-case rule
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
    'header-min-length': [2, 'always', 10],
    'subject-min-length': [2, 'always', 5],
    'type-case': [2, 'always', 'lower-case'],
    'header-max-length': [2, 'always', 72],
    'subject-full-stop': [2, 'never', '.'],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w+)(?:\(([^)]+)\))?: (.+)$/,
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },
};
