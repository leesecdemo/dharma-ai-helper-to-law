
// Mock database for cases
// In a real application, this would be replaced with an actual database
interface CaseParticipant {
  id: string;
  name: string;
  role: 'police' | 'lawyer' | 'judge' | 'public';
}

export interface CaseFile {
  id: string;
  title: string;
  description: string;
  filingDate: string;
  status: 'draft' | 'filed' | 'assigned' | 'in_progress' | 'pending_judgment' | 'closed';
  court?: string;
  nextHearing?: string;
  policeReport?: string;
  lawyerBrief?: string;
  judgeNotes?: string;
  assignedTo?: CaseParticipant[];
  createdBy: CaseParticipant;
  history: Array<{
    date: string;
    action: string;
    user: CaseParticipant;
    notes?: string;
  }>;
  documents: Array<{
    id: string;
    title: string;
    type: string;
    uploadedBy: CaseParticipant;
    uploadedOn: string;
    url: string;
  }>;
}

// Mock case data
const mockCases: CaseFile[] = [
  {
    id: "CASE-2023-001",
    title: "Theft at Mall Road",
    description: "Investigation of reported theft at Mall Road shopping complex on April 15, 2023",
    filingDate: "2023-04-16",
    status: "in_progress",
    court: "District Court, Delhi",
    nextHearing: "2023-05-30",
    policeReport: "Initial investigation reveals forced entry through the back door. CCTV footage shows three masked individuals entering at approximately 2:15 AM. Evidence collected includes fingerprints and footprints. Local witnesses report hearing sounds around 2:00 AM but did not see the perpetrators.",
    lawyerBrief: "Based on the police report and evidence collected, we have grounds to pursue charges of breaking and entering, and grand theft. The CCTV footage provides clear evidence of premeditated criminal activity.",
    assignedTo: [
      { id: "police-123", name: "Officer Singh", role: "police" },
      { id: "lawyer-456", name: "Adv. Sharma", role: "lawyer" },
      { id: "judge-789", name: "Hon. Justice Patel", role: "judge" },
    ],
    createdBy: { id: "police-123", name: "Officer Singh", role: "police" },
    history: [
      {
        date: "2023-04-16",
        action: "Case filed",
        user: { id: "police-123", name: "Officer Singh", role: "police" },
      },
      {
        date: "2023-04-18",
        action: "Assigned to lawyer",
        user: { id: "admin-001", name: "System Admin", role: "admin" },
      },
      {
        date: "2023-04-20",
        action: "Lawyer added brief",
        user: { id: "lawyer-456", name: "Adv. Sharma", role: "lawyer" },
      },
    ],
    documents: [
      {
        id: "DOC-001",
        title: "Initial Police Report",
        type: "pdf",
        uploadedBy: { id: "police-123", name: "Officer Singh", role: "police" },
        uploadedOn: "2023-04-16",
        url: "#", // In a real app, this would be a URL to the file
      },
      {
        id: "DOC-002",
        title: "CCTV Footage",
        type: "video",
        uploadedBy: { id: "police-123", name: "Officer Singh", role: "police" },
        uploadedOn: "2023-04-16",
        url: "#", // In a real app, this would be a URL to the file
      },
    ],
  },
  {
    id: "CASE-2023-002",
    title: "Vehicle Collision",
    description: "Investigation of vehicle collision at Highway 8 on April 20, 2023",
    filingDate: "2023-04-21",
    status: "assigned",
    court: "Traffic Court, Delhi",
    policeReport: "Two vehicles involved in collision. Driver of Vehicle A appears to have violated traffic signal. Breathalyzer test showed alcohol levels above legal limit. Driver of Vehicle B sustained minor injuries.",
    assignedTo: [
      { id: "police-123", name: "Officer Singh", role: "police" },
      { id: "lawyer-456", name: "Adv. Sharma", role: "lawyer" },
    ],
    createdBy: { id: "police-123", name: "Officer Singh", role: "police" },
    history: [
      {
        date: "2023-04-21",
        action: "Case filed",
        user: { id: "police-123", name: "Officer Singh", role: "police" },
      },
      {
        date: "2023-04-22",
        action: "Assigned to lawyer",
        user: { id: "admin-001", name: "System Admin", role: "admin" },
      },
    ],
    documents: [
      {
        id: "DOC-003",
        title: "Accident Report",
        type: "pdf",
        uploadedBy: { id: "police-123", name: "Officer Singh", role: "police" },
        uploadedOn: "2023-04-21",
        url: "#", // In a real app, this would be a URL to the file
      },
      {
        id: "DOC-004",
        title: "Breathalyzer Results",
        type: "pdf",
        uploadedBy: { id: "police-123", name: "Officer Singh", role: "police" },
        uploadedOn: "2023-04-21",
        url: "#", // In a real app, this would be a URL to the file
      },
    ],
  },
  {
    id: "CASE-2023-003",
    title: "Domestic Dispute",
    description: "Report of domestic dispute at Residential Colony, Sector 9 on April 22, 2023",
    filingDate: "2023-04-22",
    status: "filed",
    policeReport: "Neighbors reported loud argument and sounds of physical altercation. Upon arrival, officers found evidence of disturbance. Complainant shows signs of physical assault. Respondent denies allegations.",
    assignedTo: [
      { id: "police-123", name: "Officer Singh", role: "police" },
    ],
    createdBy: { id: "police-123", name: "Officer Singh", role: "police" },
    history: [
      {
        date: "2023-04-22",
        action: "Case filed",
        user: { id: "police-123", name: "Officer Singh", role: "police" },
      },
    ],
    documents: [
      {
        id: "DOC-005",
        title: "Initial Complaint",
        type: "pdf",
        uploadedBy: { id: "police-123", name: "Officer Singh", role: "police" },
        uploadedOn: "2023-04-22",
        url: "#", // In a real app, this would be a URL to the file
      },
    ],
  },
];

// Case management functions
export const getCases = (userRole: string): CaseFile[] => {
  // In a real app, this would filter cases based on user permissions
  return mockCases;
};

export const getCaseById = (caseId: string): CaseFile | undefined => {
  return mockCases.find(c => c.id === caseId);
};

export const updateCase = (caseId: string, updates: Partial<CaseFile>, user: CaseParticipant): CaseFile | undefined => {
  const caseIndex = mockCases.findIndex(c => c.id === caseId);
  if (caseIndex === -1) return undefined;
  
  const currentCase = { ...mockCases[caseIndex] };
  const updatedCase = { ...currentCase, ...updates };
  
  // Add action to history
  updatedCase.history = [
    ...currentCase.history,
    {
      date: new Date().toISOString().split('T')[0],
      action: `Case updated by ${user.role}`,
      user,
      notes: `Updated case fields: ${Object.keys(updates).join(', ')}`,
    },
  ];
  
  // Update the case in the mock database
  mockCases[caseIndex] = updatedCase;
  return updatedCase;
};

export const assignCase = (caseId: string, userToAssign: CaseParticipant, assignedBy: CaseParticipant): CaseFile | undefined => {
  const caseIndex = mockCases.findIndex(c => c.id === caseId);
  if (caseIndex === -1) return undefined;
  
  const currentCase = { ...mockCases[caseIndex] };
  
  // Check if user is already assigned
  if (!currentCase.assignedTo) {
    currentCase.assignedTo = [];
  }
  
  if (!currentCase.assignedTo.some(u => u.id === userToAssign.id)) {
    currentCase.assignedTo.push(userToAssign);
  }
  
  // Add action to history
  currentCase.history.push({
    date: new Date().toISOString().split('T')[0],
    action: `Assigned to ${userToAssign.name}`,
    user: assignedBy,
  });
  
  // Update status if needed
  if (currentCase.status === 'filed' && userToAssign.role === 'lawyer') {
    currentCase.status = 'assigned';
  } else if (currentCase.status === 'assigned' && userToAssign.role === 'judge') {
    currentCase.status = 'pending_judgment';
  }
  
  // Update the case in the mock database
  mockCases[caseIndex] = currentCase;
  return currentCase;
};

export const addDocument = (
  caseId: string, 
  document: Omit<CaseFile['documents'][0], 'id'>, 
  user: CaseParticipant
): CaseFile | undefined => {
  const caseIndex = mockCases.findIndex(c => c.id === caseId);
  if (caseIndex === -1) return undefined;
  
  const currentCase = { ...mockCases[caseIndex] };
  const docId = `DOC-${currentCase.documents.length + 1}`.padStart(7, '0');
  
  // Add document
  currentCase.documents.push({
    ...document,
    id: docId,
  });
  
  // Add action to history
  currentCase.history.push({
    date: new Date().toISOString().split('T')[0],
    action: `Document added: ${document.title}`,
    user,
  });
  
  // Update the case in the mock database
  mockCases[caseIndex] = currentCase;
  return currentCase;
};
