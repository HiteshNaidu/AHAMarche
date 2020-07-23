import uuid from 'uuid/v1';

export default [
  {
    id: uuid(),
    ref: 'CDD1049',
    tip: 5,
    customer: {
      name: 'Ekaterina Tankova'
    },
    createdAt: 1555016400000,
    status: 'Completed'
  },
  {
    id: uuid(),
    ref: 'CDD1048',
    tip: 4,
    customer: {
      name: 'Cao Yu'
    },
    createdAt: 1555016400000,
    status: 'Completed'
  },
  {
    id: uuid(),
    ref: 'CDD1047',
    tip: 10,
    customer: {
      name: 'Alexa Richardson'
    },
    createdAt: 1554930000000,
    status: 'Completed'
  },
  {
    id: uuid(),
    ref: 'CDD1046',
    tip: 6,
    customer: {
      name: 'Anje Keizer'
    },
    createdAt: 1554757200000,
    status: 'Completed'
  },
  {
    id: uuid(),
    ref: 'CDD1045',
    tip: 7,
    customer: {
      name: 'Clarke Gillebert'
    },
    createdAt: 1554670800000,
    status: 'Cancelled'
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    tip: 3,
    customer: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670800000,
    status: 'Completed'
  }
];
