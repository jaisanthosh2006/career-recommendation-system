// Comprehensive Mock Data & ML Logic for Career Intelligence Platform

export const CS_COURSES = [
  { id: 'cs-c-prog', title: 'C Programming', level: 'Beginner', category: 'Programming', domain: 'cs', duration: '6 Weeks', rating: 4.8, students: '14.2k', desc: 'Master foundational C programming, memory management, pointers, and data structures.', progress: 85 },
  { id: 'cs-cpp', title: 'C++', level: 'Beginner-Intermediate', category: 'Programming', domain: 'cs', duration: '8 Weeks', rating: 4.9, students: '18.5k', desc: 'Object-Oriented Programming, STL containers, pointers, memory optimization, and competitive coding.', progress: 60 },
  { id: 'cs-java', title: 'Java', level: 'Intermediate', category: 'Programming', domain: 'cs', duration: '8 Weeks', rating: 4.8, students: '22.1k', desc: 'Enterprise Java, OOP concepts, Multithreading, JVM internal architecture, and JDBC.', progress: 40 },
  { id: 'cs-python', title: 'Python', level: 'Beginner', category: 'Programming', domain: 'cs', duration: '6 Weeks', rating: 4.9, students: '35.4k', desc: 'Python syntax, data manipulation, automation, APIs, and scripting essentials.', progress: 95 },
  { id: 'cs-javascript', title: 'JavaScript', level: 'Beginner-Intermediate', category: 'Web Dev', domain: 'cs', duration: '6 Weeks', rating: 4.9, students: '29.8k', desc: 'Modern ES6+, Async/Await, DOM manipulation, closures, event loops, and web APIs.', progress: 90 },
  { id: 'cs-react', title: 'React', level: 'Intermediate', category: 'Web Dev', domain: 'cs', duration: '7 Weeks', rating: 4.9, students: '25.3k', desc: 'Hooks, State Management (Zustand/Redux), Component Architecture, Virtual DOM, and Next.js basics.', progress: 75 },
  { id: 'cs-nodejs', title: 'Node.js', level: 'Intermediate', category: 'Web Dev', domain: 'cs', duration: '6 Weeks', rating: 4.8, students: '19.2k', desc: 'Event-driven backend development, Express, Middleware, REST APIs, and authentication.', progress: 50 },
  { id: 'cs-fullstack', title: 'Full Stack Development', level: 'Advanced', category: 'Web Dev', domain: 'cs', duration: '12 Weeks', rating: 4.9, students: '31.0k', desc: 'End-to-end MERN stack web app creation, deployment, security, and scaling.', progress: 30 },
  { id: 'cs-dsa', title: 'Data Structures & Algorithms', level: 'Intermediate-Advanced', category: 'Core CS', domain: 'cs', duration: '10 Weeks', rating: 5.0, students: '42.6k', desc: 'Arrays, Trees, Graphs, Dynamic Programming, Sorting algorithms, and FAANG interview prep.', progress: 80 },
  { id: 'cs-sql', title: 'SQL', level: 'Beginner', category: 'Data & DB', domain: 'cs', duration: '4 Weeks', rating: 4.8, students: '20.4k', desc: 'Relational Database Design, Complex Queries, Joins, Indexing, and Query Optimization.', progress: 70 },
  { id: 'cs-mongodb', title: 'MongoDB', level: 'Intermediate', category: 'Data & DB', domain: 'cs', duration: '4 Weeks', rating: 4.7, students: '15.1k', desc: 'NoSQL document databases, Aggregation Framework, Indexing, and Schema Modeling.', progress: 45 },
  { id: 'cs-cloud', title: 'Cloud Computing', level: 'Intermediate', category: 'DevOps & Cloud', domain: 'cs', duration: '8 Weeks', rating: 4.8, students: '16.7k', desc: 'AWS/GCP fundamentals, EC2, S3, Serverless architectures, IAM, and Cloud Security.', progress: 35 },
  { id: 'cs-devops', title: 'DevOps', level: 'Advanced', category: 'DevOps & Cloud', domain: 'cs', duration: '8 Weeks', rating: 4.9, students: '13.9k', desc: 'CI/CD Pipelines, Docker, Kubernetes, Terraform, Ansible, and Infrastructure as Code.', progress: 20 },
  { id: 'cs-ai', title: 'Artificial Intelligence', level: 'Intermediate-Advanced', category: 'AI & ML', domain: 'cs', duration: '10 Weeks', rating: 4.9, students: '28.4k', desc: 'Search algorithms, Knowledge representation, NLP, Prompt engineering, and LLM integrations.', progress: 65 },
  { id: 'cs-ml', title: 'Machine Learning', level: 'Intermediate-Advanced', category: 'AI & ML', domain: 'cs', duration: '10 Weeks', rating: 4.9, students: '33.2k', desc: 'Supervised & Unsupervised Learning, Regression, Classification, Scikit-learn, and Model Deployment.', progress: 85 },
  { id: 'cs-dl', title: 'Deep Learning', level: 'Advanced', category: 'AI & ML', domain: 'cs', duration: '10 Weeks', rating: 4.9, students: '18.1k', desc: 'Neural Networks, CNNs, RNNs, Transformers, PyTorch, TensorFlow, and Computer Vision.', progress: 40 },
  { id: 'cs-ds', title: 'Data Science', level: 'Intermediate', category: 'AI & ML', domain: 'cs', duration: '8 Weeks', rating: 4.8, students: '24.5k', desc: 'Pandas, NumPy, EDA, Data Visualization, Statistical Analysis, and Business Analytics.', progress: 70 },
  { id: 'cs-cyber', title: 'Cyber Security', level: 'Intermediate', category: 'Core CS', domain: 'cs', duration: '8 Weeks', rating: 4.8, students: '17.3k', desc: 'Network Security, Ethical Hacking, Cryptography, Penetration Testing, and Vulnerability Assessment.', progress: 25 },
  { id: 'cs-uiux', title: 'UI/UX Design', level: 'Beginner', category: 'Design', domain: 'cs', duration: '6 Weeks', rating: 4.9, students: '21.0k', desc: 'User Research, Wireframing, Figma Design Systems, Micro-interactions, and Usability Testing.', progress: 60 },
  { id: 'cs-git', title: 'Git & GitHub', level: 'Beginner', category: 'Tools', domain: 'cs', duration: '2 Weeks', rating: 4.9, students: '38.9k', desc: 'Version Control, Branching strategies, Pull Requests, Code Review, and Open Source contributions.', progress: 95 },
  { id: 'cs-systemdesign', title: 'System Design', level: 'Advanced', category: 'Core CS', domain: 'cs', duration: '8 Weeks', rating: 4.9, students: '19.8k', desc: 'Scalable System Architecture, Load Balancing, Caching, Microservices, and Database Sharding.', progress: 50 },
  { id: 'cs-aptitude', title: 'Aptitude & Logical Reasoning', level: 'All Levels', category: 'Career', domain: 'cs', duration: '4 Weeks', rating: 4.7, students: '27.4k', desc: 'Quantitative Aptitude, Logical Reasoning, Verbal Ability, and Placement Test Prep.', progress: 90 },
  { id: 'cs-comm', title: 'Communication Skills', level: 'All Levels', category: 'Career', domain: 'cs', duration: '3 Weeks', rating: 4.8, students: '30.1k', desc: 'Professional Email Writing, Corporate Communication, Presentation Skills, and Technical Pitching.', progress: 85 }
];

export const MEDICAL_COURSES = [
  { id: 'med-anatomy', title: 'Human Anatomy', level: 'Beginner', category: 'Basic Sciences', domain: 'medical', duration: '10 Weeks', rating: 4.9, students: '19.4k', desc: 'Comprehensive study of human body structures, musculoskeletal systems, organ systems, and anatomical terminology.', progress: 80 },
  { id: 'med-physio', title: 'Human Physiology', level: 'Beginner-Intermediate', category: 'Basic Sciences', domain: 'medical', duration: '10 Weeks', rating: 4.9, students: '18.1k', desc: 'Mechanisms of body organ systems, cellular physiology, neurophysiology, and cardiovascular dynamics.', progress: 75 },
  { id: 'med-biochem', title: 'Biochemistry', level: 'Intermediate', category: 'Basic Sciences', domain: 'medical', duration: '8 Weeks', rating: 4.8, students: '14.3k', desc: 'Metabolic pathways, biomolecules, enzymatic regulation, molecular genetics, and clinical diagnostics.', progress: 60 },
  { id: 'med-microbio', title: 'Microbiology', level: 'Intermediate', category: 'Basic Sciences', domain: 'medical', duration: '8 Weeks', rating: 4.8, students: '16.5k', desc: 'Bacteriology, Virology, Mycology, Parasitology, antimicrobial resistance, and laboratory diagnostic protocols.', progress: 50 },
  { id: 'med-pathology', title: 'Pathology', level: 'Intermediate-Advanced', category: 'Clinical Sciences', domain: 'medical', duration: '10 Weeks', rating: 4.9, students: '17.8k', desc: 'Disease mechanisms, cellular injury, inflammation, neoplasia, and histopathological diagnosis.', progress: 70 },
  { id: 'med-pharmaco', title: 'Pharmacology', level: 'Intermediate-Advanced', category: 'Clinical Sciences', domain: 'medical', duration: '10 Weeks', rating: 4.9, students: '20.2k', desc: 'Pharmacokinetics, pharmacodynamics, drug classifications, adverse reactions, and prescription protocols.', progress: 65 },
  { id: 'med-firstaid', title: 'First Aid & Emergency Care', level: 'Beginner', category: 'Clinical Skills', domain: 'medical', duration: '4 Weeks', rating: 4.9, students: '32.1k', desc: 'CPR, triage, burn management, fracture stabilization, wound care, and immediate life support.', progress: 90 },
  { id: 'med-nursing', title: 'Nursing Fundamentals', level: 'Beginner-Intermediate', category: 'Nursing', domain: 'medical', duration: '8 Weeks', rating: 4.8, students: '22.4k', desc: 'Patient hygiene, vital signs monitoring, medication administration, and patient advocacy.', progress: 85 },
  { id: 'med-clinical', title: 'Clinical Skills & Examination', level: 'Intermediate', category: 'Clinical Skills', domain: 'medical', duration: '8 Weeks', rating: 4.9, students: '24.1k', desc: 'Patient history taking, auscultation, palpation, neurological assessment, and clinical documentation.', progress: 70 },
  { id: 'med-mlt', title: 'Medical Laboratory Technology', level: 'Intermediate', category: 'Diagnostics', domain: 'medical', duration: '8 Weeks', rating: 4.7, students: '13.8k', desc: 'Hematology, blood banking, clinical chemistry, automated diagnostic analyzers, and quality assurance.', progress: 55 },
  { id: 'med-coding', title: 'Medical Coding (ICD-10 & CPT)', level: 'Intermediate', category: 'Healthcare Admin', domain: 'medical', duration: '6 Weeks', rating: 4.8, students: '21.5k', desc: 'ICD-10-CM, CPT coding guidelines, HCPCS Level II, and medical claim accuracy.', progress: 75 },
  { id: 'med-billing', title: 'Medical Billing & RCM', level: 'Intermediate', category: 'Healthcare Admin', domain: 'medical', duration: '5 Weeks', rating: 4.7, students: '18.3k', desc: 'Revenue Cycle Management (RCM), health insurance claims, denial management, and HIPAA compliance.', progress: 70 },
  { id: 'med-radiology', title: 'Radiology & Medical Imaging', level: 'Advanced', category: 'Diagnostics', domain: 'medical', duration: '8 Weeks', rating: 4.9, students: '14.7k', desc: 'X-ray interpretation, CT scan analysis, MRI physics, ultrasound principles, and radiation safety.', progress: 35 },
  { id: 'med-pharmacy', title: 'Pharmacy Basics', level: 'Beginner', category: 'Pharmaceuticals', domain: 'medical', duration: '6 Weeks', rating: 4.8, students: '16.1k', desc: 'Drug dosage calculations, pharmacy law, drug storage, patient counseling, and dispensing protocols.', progress: 60 },
  { id: 'med-nutrition', title: 'Nutrition & Dietetics', level: 'Beginner-Intermediate', category: 'Wellness', domain: 'medical', duration: '6 Weeks', rating: 4.8, students: '19.9k', desc: 'Macronutrients, micronutrients, therapeutic clinical diets, metabolic disorders, and meal planning.', progress: 80 },
  { id: 'med-publichealth', title: 'Public Health & Epidemiology', level: 'Intermediate', category: 'Healthcare Admin', domain: 'medical', duration: '6 Weeks', rating: 4.8, students: '15.2k', desc: 'Disease outbreak investigation, biostatistics, preventive medicine, and global health policies.', progress: 40 },
  { id: 'med-hospitaladmin', title: 'Hospital Administration', level: 'Advanced', category: 'Healthcare Admin', domain: 'medical', duration: '8 Weeks', rating: 4.8, students: '12.4k', desc: 'Hospital accreditation (NABH/JCI), inventory management, emergency disaster management, and staff scheduling.', progress: 30 },
  { id: 'med-research', title: 'Clinical Research & Trials', level: 'Advanced', category: 'Research', domain: 'medical', duration: '8 Weeks', rating: 4.9, students: '11.6k', desc: 'GCP (Good Clinical Practice), phase I-IV trials, protocol design, IRB approval, and regulatory compliance.', progress: 40 },
  { id: 'med-mentalhealth', title: 'Mental Health Awareness', level: 'All Levels', category: 'Wellness', domain: 'medical', duration: '6 Weeks', rating: 4.9, students: '23.8k', desc: 'Psychological assessment, anxiety & depression intervention, crisis management, and empathetic care.', progress: 90 },
  { id: 'med-ethics', title: 'Healthcare Ethics & Medico-Legal', level: 'Intermediate', category: 'Healthcare Admin', domain: 'medical', duration: '4 Weeks', rating: 4.8, students: '15.9k', desc: 'Patient confidentiality (HIPAA), informed consent, medical malpractice law, and bioethics principles.', progress: 80 },
  { id: 'med-infection', title: 'Infection Control Protocols', level: 'Beginner', category: 'Clinical Skills', domain: 'medical', duration: '3 Weeks', rating: 4.9, students: '26.4k', desc: 'Sterilization, PPE guidelines, hospital-acquired infection prevention, and biosafety protocols.', progress: 95 },
  { id: 'med-telemedicine', title: 'Telemedicine & Digital Health', level: 'Beginner', category: 'Digital Health', domain: 'medical', duration: '4 Weeks', rating: 4.8, students: '17.2k', desc: 'Virtual consultations, EHR integration, remote patient monitoring, and digital triage.', progress: 85 }
];

export const STUDY_MATERIAL_TYPES = [
  { id: 'lecture-notes', name: 'Lecture Notes', icon: '📝' },
  { id: 'pdf-notes', name: 'PDF Notes', icon: '📄' },
  { id: 'ppt-slides', name: 'PowerPoint Slides', icon: '📊' },
  { id: 'anatomy-diagrams', name: 'Anatomy Diagrams & Images', icon: '🫀' },
  { id: 'clinical-cases', name: 'Clinical Case Studies', icon: '🏥' },
  { id: 'lab-manuals', name: 'Laboratory Manuals', icon: '🔬' },
  { id: 'ebooks', name: 'eBooks', icon: '📚' },
  { id: 'practice-sheets', name: 'Practice Worksheets', icon: '✏️' },
  { id: 'revision-notes', name: 'Revision Notes', icon: '📌' },
  { id: 'flashcards', name: 'Flashcards', icon: '🎴' },
  { id: 'mind-maps', name: 'Mind Maps & Flowcharts', icon: '🧠' },
  { id: 'assignments', name: 'Assignments & Quizzes', icon: '📋' },
  { id: 'pyq', name: 'Previous Year Papers', icon: '❓' },
  { id: 'sample-answers', name: 'Sample Answers', icon: '✅' },
  { id: 'cheat-sheets', name: 'Cheat Sheets', icon: '⚡' }
];

export const UPCOMING_LIVE_CLASSES = [
  {
    id: 'class-001',
    title: 'Mastering AI Resume & Portfolio Building',
    mentor: 'Dr. Sarah Jenkins',
    mentorRole: 'Senior Staff AI Recruiter @ Google',
    domain: 'cs',
    time: 'Today, 4:00 PM EST',
    seatsTotal: 100,
    seatsTaken: 78,
    status: 'Live Soon',
    category: 'Computer Science'
  },
  {
    id: 'class-002',
    title: 'Clinical Case Study: Cardiac Emergency Management',
    mentor: 'Dr. Rajesh Sharma, MD',
    mentorRole: 'Chief Cardiologist @ AIIMS Delhi',
    domain: 'medical',
    time: 'Today, 6:00 PM EST',
    seatsTotal: 80,
    seatsTaken: 65,
    status: 'Upcoming',
    category: 'Medical Science'
  },
  {
    id: 'class-003',
    title: 'System Design for High Scalability & Cloud Architecture',
    mentor: 'Alex Rivera',
    mentorRole: 'Principal Cloud Architect @ AWS',
    domain: 'cs',
    time: 'Tomorrow, 2:00 PM EST',
    seatsTotal: 120,
    seatsTaken: 110,
    status: 'Upcoming',
    category: 'Computer Science'
  },
  {
    id: 'class-004',
    title: 'ICD-10 Coding & Healthcare Revenue Cycle Optimization',
    mentor: 'Elena Rostova, MHA',
    mentorRole: 'Director of Medical Billing @ Mayo Clinic',
    domain: 'medical',
    time: 'Tomorrow, 5:00 PM EST',
    seatsTotal: 60,
    seatsTaken: 42,
    status: 'Upcoming',
    category: 'Healthcare Admin'
  }
];

export const INTERNSHIP_LISTINGS = [
  // Tech Orgs
  { id: 'int-google', company: 'Google', domain: 'cs', role: 'Software Engineering Intern', duration: '12 Weeks', location: 'Mountain View, CA / Remote', mode: 'Hybrid', eligibility: 'CS / IT Undergrads & Graduates', skills: ['Python', 'DSA', 'C++', 'System Design'], stipend: '$7,500/mo', logo: '🌐' },
  { id: 'int-msft', company: 'Microsoft', domain: 'cs', role: 'AI & Data Science Intern', duration: '10 Weeks', location: 'Redmond, WA / Remote', mode: 'Remote', eligibility: 'B.Tech / M.Tech in CS/AI', skills: ['Python', 'PyTorch', 'Azure', 'Machine Learning'], stipend: '$7,200/mo', logo: '💻' },
  { id: 'int-amazon', company: 'Amazon', domain: 'cs', role: 'Cloud & DevOps Engineering Intern', duration: '12 Weeks', location: 'Seattle, WA', mode: 'On-site', eligibility: 'CS / EE Students', skills: ['AWS', 'Docker', 'Linux', 'Java'], stipend: '$7,000/mo', logo: '📦' },
  { id: 'int-ibm', company: 'IBM', domain: 'cs', role: 'Quantum & Cyber Security Intern', duration: '8 Weeks', location: 'Armonk, NY', mode: 'Remote', eligibility: 'Final Year Engineering Students', skills: ['Cyber Security', 'Python', 'Cryptography'], stipend: '$5,800/mo', logo: '🔷' },
  { id: 'int-nvidia', company: 'NVIDIA', domain: 'cs', role: 'Deep Learning & CUDA Engineering Intern', duration: '12 Weeks', location: 'Santa Clara, CA', mode: 'Hybrid', eligibility: 'CS / Robotics Majors', skills: ['C++', 'CUDA', 'Deep Learning', 'PyTorch'], stipend: '$8,000/mo', logo: '👁️' },
  { id: 'int-tcs', company: 'TCS', domain: 'cs', role: 'Full Stack Development Trainee', duration: '6 Months', location: 'Bengaluru, India', mode: 'On-site', eligibility: 'B.E / B.Tech / MCA', skills: ['React', 'Node.js', 'SQL', 'Git'], stipend: '₹35,000/mo', logo: '🏢' },

  // Medical Orgs (All 18 Requested Hospitals & Healthcare Corporations)
  { id: 'int-apollo', company: 'Apollo Hospitals', domain: 'medical', role: 'Clinical Emergency Care Intern', department: 'Emergency Medicine', duration: '6 Months', location: 'Chennai / New Delhi', mode: 'On-site', eligibility: 'MBBS / Nursing / Paramedical', skills: ['First Aid', 'Clinical Skills', 'Emergency Care', 'Anatomy'], stipend: '₹30,000/mo', openings: 12, deadline: 'Aug 15, 2026', logo: '🏥' },
  { id: 'int-aiims', company: 'AIIMS', domain: 'medical', role: 'Pathology & Diagnostic Resident Intern', department: 'Pathology & Lab Medicine', duration: '1 Year', location: 'New Delhi', mode: 'On-site', eligibility: 'MD / MBBS / B.Sc Medical Tech', skills: ['Pathology', 'Microbiology', 'Lab Technology'], stipend: '₹50,000/mo', openings: 8, deadline: 'Aug 20, 2026', logo: '🏛️' },
  { id: 'int-fortis', company: 'Fortis Healthcare', domain: 'medical', role: 'Hospital Administration & Quality Intern', department: 'Hospital Ops', duration: '3 Months', location: 'Gurugram', mode: 'Hybrid', eligibility: 'MHA / BHA / Healthcare Admin', skills: ['Healthcare Management', 'Medical Billing', 'NABH'], stipend: '₹25,000/mo', openings: 15, deadline: 'Aug 10, 2026', logo: '🏥' },
  { id: 'int-max', company: 'Max Healthcare', domain: 'medical', role: 'Critical Care Nursing Trainee', department: 'ICU & Critical Care', duration: '6 Months', location: 'New Delhi', mode: 'On-site', eligibility: 'B.Sc Nursing / GNM', skills: ['Nursing Fundamentals', 'Patient Monitoring', 'ICU Care'], stipend: '₹28,000/mo', openings: 20, deadline: 'Aug 25, 2026', logo: '🩺' },
  { id: 'int-narayana', company: 'Narayana Health', domain: 'medical', role: 'Cardiac Clinical Operations Intern', department: 'Cardiology', duration: '6 Months', location: 'Bengaluru', mode: 'On-site', eligibility: 'MBBS / B.Sc Cardiac Care', skills: ['Human Physiology', 'ECG Analysis', 'Clinical Skills'], stipend: '₹32,000/mo', openings: 10, deadline: 'Aug 18, 2026', logo: '🫀' },
  { id: 'int-manipal', company: 'Manipal Hospitals', domain: 'medical', role: 'Radiology & Medical Imaging Intern', department: 'Radiology', duration: '4 Months', location: 'Bengaluru', mode: 'On-site', eligibility: 'B.Sc Radiology / Medical Imaging', skills: ['Radiology', 'CT/MRI Interpretation', 'Radiation Safety'], stipend: '₹26,000/mo', openings: 6, deadline: 'Aug 12, 2026', logo: '🔬' },
  { id: 'int-kims', company: 'KIMS Hospitals', domain: 'medical', role: 'Clinical Laboratory Analyst Trainee', department: 'Central Diagnostics', duration: '6 Months', location: 'Hyderabad', mode: 'On-site', eligibility: 'B.Sc MLT / DMLT', skills: ['Medical Laboratory Technology', 'Biochemistry', 'Hematology'], stipend: '₹24,000/mo', openings: 14, deadline: 'Aug 30, 2026', logo: '🧪' },
  { id: 'int-aster', company: 'Aster DM Healthcare', domain: 'medical', role: 'Telemedicine & Digital Health Specialist', department: 'Digital Health', duration: '3 Months', location: 'Kochi / Remote', mode: 'Hybrid', eligibility: 'Healthcare Admin / Digital Health', skills: ['Telemedicine', 'EHR Systems', 'Patient Counseling'], stipend: '₹27,000/mo', openings: 10, deadline: 'Sep 05, 2026', logo: '📲' },
  { id: 'int-kauvery', company: 'Kauvery Hospital', domain: 'medical', role: 'Infection Control & Bio-Safety Intern', department: 'Quality & Biosafety', duration: '3 Months', location: 'Chennai', mode: 'On-site', eligibility: 'Microbiology / Nursing / B.Sc MLT', skills: ['Infection Control', 'Sterilization', 'PPE Protocols'], stipend: '₹22,000/mo', openings: 8, deadline: 'Aug 14, 2026', logo: '🛡️' },
  { id: 'int-ramachandra', company: 'Sri Ramachandra Medical Centre', domain: 'medical', role: 'Clinical Pharmacology Research Assistant', department: 'Clinical Research', duration: '6 Months', location: 'Chennai', mode: 'On-site', eligibility: 'PharmD / B.Pharm / MBBS', skills: ['Pharmacology', 'Clinical Research', 'GCP Guidelines'], stipend: '₹29,000/mo', openings: 5, deadline: 'Aug 28, 2026', logo: '💊' },
  { id: 'int-cipla', company: 'Cipla', domain: 'medical', role: 'Pharmaceutical Quality & R&D Intern', department: 'R&D Formulation', duration: '6 Months', location: 'Mumbai', mode: 'On-site', eligibility: 'B.Pharm / M.Pharm', skills: ['Pharmacology', 'Biochemistry', 'Quality Control'], stipend: '₹28,000/mo', openings: 15, deadline: 'Aug 22, 2026', logo: '💊' },
  { id: 'int-sunpharma', company: 'Sun Pharma', domain: 'medical', role: 'Clinical Pharmacovigilance Trainee', department: 'Drug Safety', duration: '6 Months', location: 'Vadodara / Remote', mode: 'Hybrid', eligibility: 'PharmD / M.Pharm / Life Sciences', skills: ['Pharmacology', 'Adverse Drug Reaction', 'FDA Safety'], stipend: '₹30,000/mo', openings: 12, deadline: 'Sep 01, 2026', logo: '💊' },
  { id: 'int-drreddys', company: 'Dr. Reddy\'s Laboratories', domain: 'medical', role: 'Regulatory Affairs & Medical Documentation', department: 'Regulatory Affairs', duration: '6 Months', location: 'Hyderabad', mode: 'Hybrid', eligibility: 'Pharmacy / Healthcare Management', skills: ['Medical Terminology', 'Regulatory Compliance', 'Medical Documentation'], stipend: '₹31,000/mo', openings: 10, deadline: 'Aug 16, 2026', logo: '📄' },
  { id: 'int-pfizer', company: 'Pfizer', domain: 'medical', role: 'Clinical Trial Data Analytics Intern', department: 'Global Biometrics', duration: '6 Months', location: 'New York / Remote', mode: 'Remote', eligibility: 'Bioinformatics / Public Health / PharmD', skills: ['Clinical Research', 'Biostatistics', 'Public Health'], stipend: '$4,500/mo', openings: 6, deadline: 'Sep 10, 2026', logo: '💉' },
  { id: 'int-abbott', company: 'Abbott', domain: 'medical', role: 'Medical Coding & Health Economics Intern', department: 'Healthcare Economics', duration: '4 Months', location: 'Chicago, IL / Remote', mode: 'Remote', eligibility: 'Medical Coding Certified / MHA', skills: ['Medical Coding', 'Medical Billing', 'ICD-10'], stipend: '$3,800/mo', openings: 8, deadline: 'Aug 24, 2026', logo: '📊' },
  { id: 'int-roche', company: 'Roche', domain: 'medical', role: 'Molecular Diagnostics & Oncology Intern', department: 'Diagnostic Solutions', duration: '6 Months', location: 'Basel, Switzerland / Remote', mode: 'Hybrid', eligibility: 'Biochemistry / Molecular Biology / MD', skills: ['Pathology', 'Biochemistry', 'Microbiology'], stipend: '€3,500/mo', openings: 4, deadline: 'Sep 15, 2026', logo: '🔬' },
  { id: 'int-siemens', company: 'Siemens Healthineers', domain: 'medical', role: 'Medical Imaging AI & Radiology Specialist Intern', department: 'Diagnostic Imaging AI', duration: '4 Months', location: 'Erlangen, Germany / Remote', mode: 'Hybrid', eligibility: 'Radiology Tech / Biomedical Engineering', skills: ['Radiology', 'Medical Imaging', 'CT/MRI Analysis'], stipend: '€3,200/mo', openings: 6, deadline: 'Aug 30, 2026', logo: '👁️' },
  { id: 'int-philips', company: 'Philips Healthcare', domain: 'medical', role: 'Patient Monitoring & Hospital Workflow Specialist', department: 'Connected Care', duration: '6 Months', location: 'Eindhoven, Netherlands / Remote', mode: 'Remote', eligibility: 'Nursing / Healthcare Admin / Biomedical', skills: ['Nursing Fundamentals', 'Healthcare Management', 'Telemedicine'], stipend: '€3,000/mo', openings: 9, deadline: 'Sep 02, 2026', logo: '⚡' }
];

export const JOB_RECOMMENDATIONS = [
  // CS Jobs
  { id: 'job-fullstack', title: 'Senior Full Stack Engineer', company: 'Zoho', domain: 'cs', salary: '$110,000 - $140,000 / yr', location: 'Austin, TX / Remote', skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'], type: 'Full-time', matchScore: 94 },
  { id: 'job-mldev', title: 'Machine Learning Engineer', company: 'Cognizant', domain: 'cs', salary: '$125,000 - $160,000 / yr', location: 'San Jose, CA', skills: ['Python', 'TensorFlow', 'Scikit-learn', 'Docker'], type: 'Full-time', matchScore: 91 },
  { id: 'job-cloudarch', title: 'DevOps & Cloud Engineer', company: 'Accenture', domain: 'cs', salary: '$105,000 - $135,000 / yr', location: 'Chicago, IL', skills: ['Cloud Computing', 'DevOps', 'Kubernetes', 'CI/CD'], type: 'Full-time', matchScore: 88 },
  { id: 'job-uiux', title: 'Lead UI/UX Product Designer', company: 'Deloitte', domain: 'cs', salary: '$95,000 - $120,000 / yr', location: 'New York, NY', skills: ['UI/UX Design', 'Figma', 'User Research', 'HTML/CSS'], type: 'Full-time', matchScore: 86 },

  // Medical Jobs
  { id: 'job-emergencymd', title: 'Emergency Room Clinical Specialist', company: 'Max Healthcare', domain: 'medical', salary: '$140,000 - $180,000 / yr', location: 'New Delhi / Remote Consult', skills: ['Emergency Care', 'Clinical Skills', 'First Aid', 'Anatomy'], type: 'Full-time', matchScore: 95 },
  { id: 'job-medcoder', title: 'Senior Medical Coder & Auditor', company: 'Abbott Healthcare', domain: 'medical', salary: '$75,000 - $95,000 / yr', location: 'Remote', skills: ['Medical Coding', 'Medical Billing', 'Medical Terminology'], type: 'Full-time', matchScore: 92 },
  { id: 'job-hospadmin', title: 'Assistant Hospital Administrator', company: 'Narayana Health', domain: 'medical', salary: '$90,000 - $115,000 / yr', location: 'Bengaluru', skills: ['Hospital Administration', 'Healthcare Management', 'Healthcare Ethics'], type: 'Full-time', matchScore: 89 },
  { id: 'job-clinresearch', title: 'Clinical Research Associate (CRA)', company: 'Roche', domain: 'medical', salary: '$100,000 - $130,000 / yr', location: 'Basel, Switzerland / Remote', skills: ['Clinical Research', 'Pharmacology', 'Microbiology'], type: 'Full-time', matchScore: 87 }
];

export const PROJECT_HUB = [
  // CS Projects
  {
    id: 'proj-cs-1',
    title: 'AI-Powered Medical Diagnostic Assistant & EHR System',
    domain: 'cs',
    level: 'Advanced',
    category: 'AI & Web Dev',
    desc: 'Build an enterprise web application integrating Gemini API to analyze patient symptoms, suggest ICD-10 medical codes, and visualize clinical metrics.',
    stack: ['React', 'FastAPI', 'Python', 'Tailwind CSS', 'Google Gemini API', 'PostgreSQL'],
    folderStructure: `
├── client/          # React + Vite Frontend
│   ├── src/
│   │   ├── components/  # Diagnostic Form, Patient Records, EHR Chart
│   │   └── services/    # API calls to backend
├── server/          # FastAPI Python Server
│   ├── main.py      # REST Endpoints
│   ├── ai_model.py  # Gemini Symptom Analysis Pipeline
│   └── models.py    # Database Schemas
└── docker-compose.yml`,
    dataset: 'MIMIC-III Clinical Database (De-identified)',
    apis: ['Google Gemini Pro API', 'ICD-10 Lookup REST API'],
    guide: '1. Clone repository\n2. Configure backend python virtual environment with FastAPI and google-generativeai\n3. Setup PostgreSQL DB schema\n4. Run frontend with vite\n5. Test symptom analysis with sample patient reports.',
    githubUrl: 'https://github.com/example/ai-ehr-diagnostic-system',
    deployment: 'Deploy frontend on Vercel and backend on Render / AWS EC2 with Docker.',
    resumePoints: [
      'Engineered an AI diagnostic assistant reducing symptom review time by 45%.',
      'Integrated Google Gemini API for automated ICD-10 code extraction with 92% accuracy.',
      'Designed a secure HIPAA-compliant EHR storage system using FastAPI and PostgreSQL.'
    ]
  },
  {
    id: 'proj-cs-2',
    title: 'Real-Time Collaborative Code & Clinical Case Editor',
    domain: 'cs',
    level: 'Intermediate',
    category: 'Full Stack & WebSockets',
    desc: 'Interactive real-time editor featuring live multi-user cursor tracking, syntax highlighting, WebRTC voice channels, and instantaneous compilation.',
    stack: ['React', 'Node.js', 'Socket.io', 'WebRTC', 'Monaco Editor'],
    folderStructure: `
├── src/
│   ├── components/  # CodeEditor, VideoPanel, ChatBox
│   ├── hooks/       # useWebRTC, useSocket
│   └── App.jsx
├── server/          # Express + Socket.io Server
│   └── index.js     # Room Signalling & Code Sync Logic`,
    dataset: 'LeetCode & Medical Quiz Question Bank JSON',
    apis: ['Piston Code Execution API'],
    guide: '1. Install socket.io & monaco-editor\n2. Implement room management in Node.js\n3. Connect WebRTC peer-to-peer audio stream.',
    githubUrl: 'https://github.com/example/realtime-collaborative-editor',
    deployment: 'Deploy server on Render and client on Netlify.',
    resumePoints: [
      'Architected a low-latency WebSockets server handling 50+ concurrent code collaboration rooms.',
      'Implemented WebRTC peer audio streaming and dynamic Monaco editor binding.'
    ]
  },

  // Medical Projects
  {
    id: 'proj-med-1',
    title: 'Clinical Audit & Hospital Emergency Triage Workflow System',
    domain: 'medical',
    level: 'Intermediate',
    category: 'Clinical & Admin',
    desc: 'Develop a standardized emergency triage protocol simulator calculating patient priority index based on vital signs, Glasgow Coma Scale (GCS), and chief complaints.',
    stack: ['Clinical Protocols', 'Vital Signs Matrix', 'Excel / Dashboard', 'Triage Simulator'],
    folderStructure: `
├── clinical_docs/   # ESI Triage Guidelines & Checklists
├── dataset/         # 500+ Emergency Patient Simulation Case Files
├── analytics/       # Wait time reduction & Triage Accuracy Excel Model
└── presentation/    # Clinical Board Slide Deck`,
    dataset: 'Emergency Severity Index (ESI) Public Benchmark Data',
    apis: ['CDC Health Data REST API'],
    guide: '1. Review Emergency Severity Index (ESI) 5-level algorithms\n2. Perform patient case categorization\n3. Formulate hospital triage bottleneck report.',
    githubUrl: 'https://github.com/example/hospital-triage-audit-system',
    deployment: 'Share via Interactive Web Portal or Hospital Intranet Dashboard.',
    resumePoints: [
      'Developed an ESI 5-level emergency triage simulation model optimizing ER patient intake.',
      'Analyzed 500+ patient emergency cases to reduce high-risk triage error rates by 30%.',
      'Created standardized clinical documentation guidelines adopted for medical training.'
    ]
  },
  {
    id: 'proj-med-2',
    title: 'Pharmacovigilance & Drug Interaction Safety Matrix',
    domain: 'medical',
    level: 'Advanced',
    category: 'Pharmacology & Safety',
    desc: 'Establish a comprehensive adverse drug reaction (ADR) mapping system identifying high-risk drug-drug interactions and dosage risk factors.',
    stack: ['DrugBank DB', 'FDA FAERS Data', 'Clinical Pharmacology Matrix'],
    folderStructure: `
├── drug_database/   # Pharmacology & Contraindication Mapping
├── adr_reports/     # Post-market surveillance logs
└── audit_report/    # Risk mitigation recommendations`,
    dataset: 'FDA Adverse Event Reporting System (FAERS)',
    apis: ['NIH RxNorm & RxNav API'],
    guide: '1. Query NIH RxNav API for drug contraindications\n2. Map cytochrome P450 enzyme interactions\n3. Draft clinical pharmacist advisory document.',
    githubUrl: 'https://github.com/example/pharmacovigilance-safety-matrix',
    deployment: 'Publish clinical research whitepaper and interactive pharmacy tool.',
    resumePoints: [
      'Compiled a drug interaction matrix covering 200+ commonly prescribed therapeutic agents.',
      'Utilized FDA FAERS datasets to identify early adverse reaction signals for cardiovascular medications.',
      'Author of clinical guidelines for dosage adjustment in renal and hepatic impairment.'
    ]
  }
];

export const MOCK_INTERVIEW_QUESTIONS = {
  cs: [
    { id: 1, question: "Explain the difference between SQL and NoSQL databases. When would you choose MongoDB over PostgreSQL?", category: "Database & System Design" },
    { id: 2, question: "How does the JavaScript Event Loop work? Explain microtasks vs macrotasks.", category: "JavaScript / Web Dev" },
    { id: 3, question: "How would you optimize a React application that is experiencing slow rendering performance?", category: "React / Frontend" },
    { id: 4, question: "Describe how you would design a URL shortening service like Bitly for high availability.", category: "System Design" },
    { id: 5, question: "Tell me about a challenging bug you encountered in a project and how you resolved it.", category: "HR / Behavioral" }
  ],
  medical: [
    { id: 1, question: "Walk me through your assessment process when a patient presents with sudden acute chest pain in the ER.", category: "Emergency & Clinical Care" },
    { id: 2, question: "What are the primary clinical indications for prescribing ACE inhibitors vs ARBs?", category: "Pharmacology" },
    { id: 3, question: "Explain the universal precautions for infection control and PPE donning/doffing sequence.", category: "Infection Control & Safety" },
    { id: 4, question: "How do you handle a situation where a patient refuses vital medical treatment due to religious beliefs?", category: "Healthcare Ethics" },
    { id: 5, question: "Walk through ICD-10 medical coding rules for chronic kidney disease with hypertensive heart disease.", category: "Medical Coding & Billing" },
    { id: 6, question: "Describe a stressful clinical situation you experienced during rounds and how you communicated under pressure.", category: "HR & Hospital Scenarios" }
  ]
};

// Simulated Machine Learning Engine
export const ML_ENGINE = {
  calculateATSScore: (resumeText = '', targetDomain = 'cs') => {
    let baseScore = 65;
    const csKeywords = ['react', 'python', 'javascript', 'fastapi', 'dsa', 'aws', 'docker', 'sql', 'git', 'node', 'full stack'];
    const medKeywords = ['anatomy', 'physiology', 'clinical', 'pharmacology', 'pathology', 'emergency', 'icd-10', 'patient', 'first aid', 'hipaa', 'nursing', 'radiology', 'mlt'];
    
    const keywords = targetDomain === 'cs' ? csKeywords : medKeywords;
    const textLower = resumeText.toLowerCase();
    
    let matchedCount = 0;
    keywords.forEach(kw => {
      if (textLower.includes(kw)) matchedCount++;
    });

    const boost = Math.min(matchedCount * 3.5, 30);
    const score = Math.min(Math.round(baseScore + boost), 98);
    
    return {
      atsScore: score,
      rating: score >= 85 ? 'Excellent (Top 5%)' : score >= 70 ? 'Good (Passes standard ATS)' : 'Needs Improvement',
      keywordMatchRate: `${Math.round((matchedCount / keywords.length) * 100)}%`,
      missingKeywords: keywords.filter(kw => !textLower.includes(kw)).slice(0, 5),
      improvementTips: [
        'Add quantitative metrics to your clinical/project achievements (e.g., "Assisted in 120+ patient triage protocols").',
        'Include exact industry certifications (e.g., AWS Certified, ACLS/BLS, Certified Medical Coder).',
        'Ensure standard section headers like "Clinical Competencies", "Hospital Internships", and "Education".'
      ]
    };
  },

  calculatePlacementReadiness: (userStats) => {
    const { coursesCompleted = 5, resumeATS = 85, projectsCount = 3, attendance = 90 } = userStats;
    const score = Math.round((coursesCompleted * 4) + (resumeATS * 0.4) + (projectsCount * 6) + (attendance * 0.2));
    const cappedScore = Math.min(score, 96);

    return {
      readinessScore: cappedScore,
      status: cappedScore >= 80 ? 'Placement Ready 🚀' : 'Nearing Readiness 📈',
      predictedSalaryRange: userStats.domain === 'cs' ? '$85,000 - $130,000 / yr' : '$90,000 - $145,000 / yr',
      recommendedFocus: cappedScore >= 80 ? 'Start applying to recommended roles & attend Mock Interviews' : 'Complete 1 more Advanced Project & raise ATS score above 85%'
    };
  },

  performSkillGapAnalysis: (userSkills = [], targetRole = 'Senior Full Stack Engineer') => {
    const requiredSkillsMap = {
      'Senior Full Stack Engineer': ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'System Design', 'Git'],
      'Machine Learning Engineer': ['Python', 'Machine Learning', 'Deep Learning', 'PyTorch', 'SQL', 'DevOps'],
      'Emergency Room Specialist': ['Emergency Care', 'Clinical Skills', 'First Aid', 'Anatomy', 'Physiology', 'Pharmacology'],
      'Medical Coding Specialist': ['Medical Coding', 'Medical Billing', 'Medical Terminology', 'Pathology', 'Healthcare Ethics']
    };

    const targetList = requiredSkillsMap[targetRole] || ['React', 'Python', 'Git', 'DSA'];
    const matched = targetList.filter(s => userSkills.includes(s));
    const missing = targetList.filter(s => !userSkills.includes(s));
    const matchPercentage = Math.round((matched.length / targetList.length) * 100);

    return {
      targetRole,
      matchPercentage,
      matchedSkills: matched,
      missingSkills: missing,
      estimatedTimeWeeks: missing.length * 2,
      suggestedCourses: missing.map(sk => `Mastering ${sk} for Professional Industry Standards`)
    };
  }
};
