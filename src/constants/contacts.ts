export interface TeamMember {
  name: string
  email: string
}

export interface Department {
  key: string
  members: TeamMember[]
}

export const COMPANY = {
  name: 'ATRIUM – INTERIERI d.o.o.',
  address: 'Kolodvorska ulica 28',
  city: '9240 Ljutomer',
  country: 'Slovenija',
  phone: '+386 (0)2 584 90 70',
}

export const TEAM_CONTACTS: Department[] = [
  {
    key: 'director',
    members: [{ name: 'Božo Knehtl', email: 'bozok@atrium-pohistvo.eu' }],
  },
  {
    key: 'ceo',
    members: [{ name: 'Žan Knehtl', email: 'zank@atrium-pohistvo.eu' }],
  },
  {
    key: 'secretary',
    members: [{ name: 'Amanda Hedžet', email: 'amandah@atrium-pohistvo.eu' }],
  },
  {
    key: 'procurement',
    members: [{ name: 'Stane Zver', email: 'stanez@atrium-pohistvo.eu' }],
  },
  {
    key: 'commercial',
    members: [{ name: 'Tarig Yacoub', email: 'tarigy@atrium-pohistvo.eu' }],
  },
  {
    key: 'work_prep',
    members: [
      { name: 'Jožef Šumak', email: 'jozefs@atrium-pohistvo.eu' },
      { name: 'Markus Mar', email: 'markusm@atrium-pohistvo.eu' },
      { name: 'Iztok Čeh', email: 'iztokc@atrium-pohistvo.eu' },
      { name: 'Marin Šunjo', email: 'marins@atrium-pohistvo.eu' },
    ],
  },
  {
    key: 'production_mgr',
    members: [
      { name: 'Miroslav Blazević', email: 'miroslavb@atrium-pohistvo.eu' },
    ],
  },
  {
    key: 'assembly_mgr',
    members: [{ name: 'Miha Fekonja', email: 'mihaf@atrium-pohistvo.eu' }],
  },
  {
    key: 'warehouse',
    members: [
      { name: 'Jadranka Oković', email: 'jadrankao@atrium-pohistvo.eu' },
    ],
  },
]
