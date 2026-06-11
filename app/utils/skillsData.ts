export interface Skill {
  name: string
  color: string
  logo?: string
  logoText?: string
  url: string
  darkClass?: string
}

export const languages: Skill[] = [
  { name: 'Python',     color: '#3776ab', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',         url: 'https://www.python.org' },
  { name: 'TypeScript', color: '#3178c6', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', url: 'https://www.typescriptlang.org' },
  { name: 'SQL',        color: '#4169e1', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg', url: 'https://www.postgresql.org/docs/current/sql.html' },
  { name: 'Bash',       color: '#4eaa25', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',             url: 'https://www.gnu.org/software/bash/', darkClass: 'dark:invert' },
]

export const frameworks: Skill[] = [
  { name: 'Vue.js',  color: '#42b883', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',     url: 'https://vuejs.org' },
  { name: 'FastAPI', color: '#009688', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', url: 'https://fastapi.tiangolo.com' },
  { name: 'Node.js', color: '#339933', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',   url: 'https://nodejs.org' },
]

export const databases: Skill[] = [
  { name: 'PostgreSQL', color: '#4169e1', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', url: 'https://www.postgresql.org' },
  { name: 'MongoDB',    color: '#47a248', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',       url: 'https://www.mongodb.com' },
]

export const devops: Skill[] = [
  { name: 'AWS',   color: '#ff9900', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', url: 'https://aws.amazon.com' },
  { name: 'Docker',color: '#2496ed', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',                                      url: 'https://www.docker.com' },
  { name: 'Nginx', color: '#009900', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',                                        url: 'https://nginx.org' },
  { name: 'Linux', color: '#fcc624', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',                                        url: 'https://kernel.org' },
  { name: 'CI/CD', color: '#2088ff', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg',                 url: 'https://docs.github.com/en/actions' },
]

export const iot: Skill[] = [
  { name: 'ESP32',        color: '#e7352c', logo: 'https://cdn.simpleicons.org/espressif/e7352c',                                                                url: 'https://www.espressif.com' },
  { name: 'Arduino',      color: '#00979d', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg',                             url: 'https://www.arduino.cc' },
  { name: 'Raspberry Pi', color: '#a22846', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg',                     url: 'https://www.raspberrypi.com' },
  { name: 'MQTT',         color: '#660066', logoText: 'MQTT',                                                                                                    url: 'https://mqtt.org' },
]

export const tools: Skill[] = [
  { name: 'Git',       color: '#f05032', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',                url: 'https://git-scm.com' },
  { name: 'GitHub',    color: '#181717', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',          url: 'https://github.com', darkClass: 'dark:invert' },
  { name: 'Postman',   color: '#ff6c37', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg',  url: 'https://www.postman.com' },
  { name: 'Jira',      color: '#0052cc', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg',              url: 'https://www.atlassian.com/software/jira' },
  { name: 'Bitbucket', color: '#0052cc', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bitbucket/bitbucket-original.svg',    url: 'https://bitbucket.org' },
  { name: 'Taiga',     color: '#70ba43', logoText: 'TG',                                                                                 url: 'https://taiga.io' },
]

// Suma total de tecnologías técnicas (se usa en el contador del Hero)
export const TECH_COUNT =
  languages.length + frameworks.length + databases.length +
  devops.length + iot.length + tools.length
