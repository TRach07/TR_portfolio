/**
 * Skills data displayed in the Skills application.
 * Organized by category with proficiency levels and icon sources.
 * Most icons from https://devicon.dev/, some local SVGs for missing ones.
 */

export interface Skill {
  name: string;
  level: number;
  /** Devicon CDN slug or local path (starting with /) */
  icon: string;
  /** If true, icon is a local path instead of devicon slug */
  local?: boolean;
}

/** Concept-based skill (no logo, displayed as a styled tag) */
export interface ConceptSkill {
  name: string;
  level: number;
}

export interface SkillCategory {
  id: string;
  titleKey: string;
  skills: Skill[];
  /** Optional concept skills (displayed as tags, no logos) */
  concepts?: ConceptSkill[];
}

/** Base URL for devicon CDN SVG icons */
export const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    titleKey: "skills.languages",
    skills: [
      { name: "Java", level: 85, icon: "java/java-original.svg" },
      { name: "Python", level: 80, icon: "python/python-original.svg" },
      { name: "JavaScript", level: 85, icon: "javascript/javascript-original.svg" },
      { name: "TypeScript", level: 85, icon: "typescript/typescript-original.svg" },
      { name: "C", level: 70, icon: "c/c-original.svg" },
      { name: "C#", level: 65, icon: "csharp/csharp-original.svg" },
      { name: "SQL", level: 90, icon: "azuresqldatabase/azuresqldatabase-original.svg" },
      { name: "Scala", level: 50, icon: "scala/scala-original.svg" },
    ],
  },
  {
    id: "web",
    titleKey: "skills.web",
    skills: [
      { name: "React", level: 85, icon: "react/react-original.svg" },
      { name: "Next.js", level: 85, icon: "nextjs/nextjs-original.svg" },
      { name: "Node.js", level: 80, icon: "nodejs/nodejs-original.svg" },
      { name: "NestJS", level: 75, icon: "nestjs/nestjs-original.svg" },
      { name: "Spring Boot", level: 75, icon: "spring/spring-original.svg" },
      { name: ".NET", level: 65, icon: "dotnetcore/dotnetcore-original.svg" },
      { name: "HTML / CSS", level: 90, icon: "html5/html5-original.svg" },
      { name: "PHP", level: 60, icon: "php/php-original.svg" },
    ],
  },
  {
    id: "databases",
    titleKey: "skills.databases",
    skills: [
      { name: "PostgreSQL", level: 90, icon: "postgresql/postgresql-original.svg" },
      { name: "MySQL", level: 90, icon: "mysql/mysql-original.svg" },
      { name: "SQL Server", level: 90, icon: "microsoftsqlserver/microsoftsqlserver-plain.svg" },
      { name: "MongoDB", level: 75, icon: "mongodb/mongodb-original.svg" },
      { name: "Redis", level: 65, icon: "redis/redis-original.svg" },
      { name: "Cassandra", level: 60, icon: "cassandra/cassandra-original.svg" },
      { name: "Neo4j", level: 55, icon: "neo4j/neo4j-original.svg" },
    ],
  },
  {
    id: "bigdata",
    titleKey: "skills.bigdata",
    skills: [
      { name: "Hadoop", level: 65, icon: "hadoop/hadoop-original.svg" },
      { name: "Kafka", level: 70, icon: "apachekafka/apachekafka-original.svg" },
      { name: "Flink", level: 60, icon: "/icons/skills/flink.png", local: true },
      { name: "Talend / ETL", level: 65, icon: "/icons/skills/talend.png", local: true },
      { name: "Azure", level: 60, icon: "azure/azure-original.svg" },
      { name: "ELK Stack", level: 70, icon: "elasticsearch/elasticsearch-original.svg" },
      { name: "PySpark", level: 70, icon: "apachespark/apachespark-original.svg" },
    ],
  },
  {
    id: "ml",
    titleKey: "skills.ml",
    concepts: [
      { name: "Supervised Learning", level: 85 },
      { name: "Unsupervised Learning", level: 80 },
      { name: "Reinforcement Learning", level: 60 },
      { name: "CNN", level: 70 },
      { name: "RNN", level: 70 },
      { name: "Transformers / LLM", level: 65 },
    ],
    skills: [
      { name: "TensorFlow", level: 70, icon: "tensorflow/tensorflow-original.svg" },
      { name: "PyTorch", level: 65, icon: "pytorch/pytorch-original.svg" },
      { name: "Scikit-learn", level: 75, icon: "scikitlearn/scikitlearn-original.svg" },
      { name: "Pandas", level: 80, icon: "pandas/pandas-original.svg" },
      { name: "NumPy", level: 80, icon: "numpy/numpy-original.svg" },
      { name: "Jupyter", level: 85, icon: "jupyter/jupyter-original.svg" },
    ],
  },
  {
    id: "devops",
    titleKey: "skills.devops",
    skills: [
      { name: "Docker", level: 75, icon: "docker/docker-original.svg" },
      { name: "Ansible", level: 60, icon: "ansible/ansible-original.svg" },
      { name: "Git", level: 85, icon: "git/git-original.svg" },
      { name: "SonarCloud", level: 65, icon: "sonarqube/sonarqube-original.svg" },
      { name: "UML / Merise", level: 70, icon: "unifiedmodelinglanguage/unifiedmodelinglanguage-original.svg" },
    ],
  },
  {
    id: "ide",
    titleKey: "skills.ide",
    skills: [
      { name: "VS Code", level: 90, icon: "vscode/vscode-original.svg" },
      { name: "Visual Studio", level: 70, icon: "visualstudio/visualstudio-original.svg" },
      { name: "Eclipse", level: 70, icon: "eclipse/eclipse-original.svg" },
      { name: "IntelliJ IDEA", level: 75, icon: "intellij/intellij-original.svg" },
    ],
  },
];
