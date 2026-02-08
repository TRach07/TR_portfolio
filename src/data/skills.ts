/**
 * Skills data displayed in the Skills application.
 * Organized by category with proficiency levels (0-100).
 */

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  id: string;
  titleKey: string;
  skills: Skill[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    titleKey: "skills.languages",
    skills: [
      { name: "Java", level: 85 },
      { name: "Python", level: 80 },
      { name: "JavaScript / TypeScript", level: 85 },
      { name: "C", level: 70 },
      { name: "C#", level: 65 },
      { name: "SQL", level: 90 },
      { name: "Scala", level: 50 },
    ],
  },
  {
    id: "web",
    titleKey: "skills.web",
    skills: [
      { name: "React / Next.js", level: 85 },
      { name: "Node.js / Nest.js", level: 80 },
      { name: "Spring Boot", level: 75 },
      { name: ".NET", level: 65 },
      { name: "HTML / CSS", level: 90 },
      { name: "PHP", level: 60 },
    ],
  },
  {
    id: "databases",
    titleKey: "skills.databases",
    skills: [
      { name: "PostgreSQL / MySQL", level: 90 },
      { name: "SQL Server", level: 90 },
      { name: "MongoDB", level: 75 },
      { name: "Redis", level: 65 },
      { name: "Cassandra", level: 60 },
      { name: "Neo4j", level: 55 },
    ],
  },
  {
    id: "bigdata",
    titleKey: "skills.bigdata",
    skills: [
      { name: "Hadoop", level: 65 },
      { name: "Kafka", level: 70 },
      { name: "Flink", level: 60 },
      { name: "Talend / ETL", level: 65 },
      { name: "Azure", level: 60 },
      { name: "Elasticsearch / Kibana", level: 70 },
    ],
  },
  {
    id: "ml",
    titleKey: "skills.ml",
    skills: [
      { name: "Supervised / Unsupervised", level: 75 },
      { name: "Reinforcement Learning", level: 60 },
      { name: "CNN / RNN", level: 70 },
      { name: "Transformers / LLM", level: 65 },
    ],
  },
  {
    id: "devops",
    titleKey: "skills.devops",
    skills: [
      { name: "Docker", level: 75 },
      { name: "Ansible", level: 60 },
      { name: "Git", level: 85 },
      { name: "SonarCloud", level: 65 },
      { name: "UML / Merise", level: 70 },
    ],
  },
];
