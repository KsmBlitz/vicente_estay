export interface Skill {
  name: string
  color: string
  logo?: string
  logoText?: string
  url: string
  darkClass?: string
}

export const languages: Skill[] = [
  { name: 'Python',     color: '#3776ab', logo: '/logos/python.svg',         url: 'https://www.python.org' },
  { name: 'TypeScript', color: '#3178c6', logo: '/logos/typescript.svg', url: 'https://www.typescriptlang.org' },
  { name: 'SQL',        color: '#4169e1', logo: '/logos/sql.svg', url: 'https://www.postgresql.org/docs/current/sql.html' },
  { name: 'Bash',       color: '#4eaa25', logo: '/logos/bash.svg',             url: 'https://www.gnu.org/software/bash/', darkClass: 'dark:invert' },
]

export const frameworks: Skill[] = [
  { name: 'Vue.js',  color: '#42b883', logo: '/logos/vue-js.svg',     url: 'https://vuejs.org' },
  { name: 'FastAPI', color: '#009688', logo: '/logos/fastapi.svg', url: 'https://fastapi.tiangolo.com' },
  { name: 'Node.js', color: '#339933', logo: '/logos/node-js.svg',   url: 'https://nodejs.org' },
]

export const databases: Skill[] = [
  { name: 'PostgreSQL', color: '#4169e1', logo: '/logos/postgresql.svg', url: 'https://www.postgresql.org' },
  { name: 'MongoDB',    color: '#47a248', logo: '/logos/mongodb.svg',       url: 'https://www.mongodb.com' },
]

export const devops: Skill[] = [
  { name: 'AWS',   color: '#ff9900', logo: '/logos/aws.svg', url: 'https://aws.amazon.com' },
  { name: 'Docker',color: '#2496ed', logo: '/logos/docker.svg',                                      url: 'https://www.docker.com' },
  { name: 'Nginx', color: '#009900', logo: '/logos/nginx.svg',                                        url: 'https://nginx.org' },
  { name: 'Linux', color: '#fcc624', logo: '/logos/linux.svg',                                        url: 'https://kernel.org' },
  { name: 'CI/CD', color: '#2088ff', logo: '/logos/ci-cd.svg',                 url: 'https://docs.github.com/en/actions' },
]

export const iot: Skill[] = [
  { name: 'ESP32',        color: '#e7352c', logo: '/logos/esp32.svg',                                                                url: 'https://www.espressif.com' },
  { name: 'Arduino',      color: '#00979d', logo: '/logos/arduino.svg',                             url: 'https://www.arduino.cc' },
  { name: 'Raspberry Pi', color: '#a22846', logo: '/logos/raspberry-pi.svg',                     url: 'https://www.raspberrypi.com' },
  { name: 'MQTT',         color: '#660066', logoText: 'MQTT',                                                                                                    url: 'https://mqtt.org' },
]

export const tools: Skill[] = [
  { name: 'Git',       color: '#f05032', logo: '/logos/git.svg',                url: 'https://git-scm.com' },
  { name: 'GitHub',    color: '#181717', logo: '/logos/github.svg',          url: 'https://github.com', darkClass: 'dark:invert' },
  { name: 'Postman',   color: '#ff6c37', logo: '/logos/postman.svg',  url: 'https://www.postman.com' },
  { name: 'Jira',      color: '#0052cc', logo: '/logos/jira.svg',              url: 'https://www.atlassian.com/software/jira' },
  { name: 'Bitbucket', color: '#0052cc', logo: '/logos/bitbucket.svg',    url: 'https://bitbucket.org' },
  { name: 'Taiga',     color: '#70ba43', logoText: 'TG',                                                                                 url: 'https://taiga.io' },
]

// Suma total de tecnologías técnicas (se usa en el contador del Hero)
export const TECH_COUNT =
  languages.length + frameworks.length + databases.length +
  devops.length + iot.length + tools.length
