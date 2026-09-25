import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { fetchGoogleContacts, createGoogleContact, GoogleContact } from '../lib/googleContacts';
import {
  getEmployees,
  saveEmployee,
  deleteEmployee,
  getPayrolls,
  submitPayrollRun,
  saveAiTaskRecord,
  Employee,
  PayrollRun,
} from '../lib/gustoData';
import { GeminiChatbot } from './GeminiChatbot';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: string;
  user: User | null;
  onSignIn: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'payroll',
  user,
  onSignIn,
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  // Data states
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [payrolls, setPayrolls] = useState<PayrollRun[]>([]);
  const [googleContacts, setGoogleContacts] = useState<GoogleContact[]>([]);
  const [isContactsLoading, setIsContactsLoading] = useState(false);
  const [contactsError, setContactsError] = useState<string | null>(null);

  // New Contact Form State
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [newGivenName, setNewGivenName] = useState('');
  const [newFamilyName, setNewFamilyName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRole, setNewRole] = useState('');
  const [isCreatingContact, setIsCreatingContact] = useState(false);
  const [contactSuccessMsg, setContactSuccessMsg] = useState('');

  // AI State
  const [aiPrompt, setAiPrompt] = useState('Analyze tax credits for our 5-person engineering & design team in 2026.');
  const [aiResult, setAiResult] = useState('');
  const [aiModelUsed, setAiModelUsed] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiMode, setAiMode] = useState<'complex' | 'fast' | 'maps'>('complex');
  const [mapSources, setMapSources] = useState<Array<{ title: string; uri: string; snippet?: string }>>([]);

  // TTS State
  const [ttsText, setTtsText] = useState('Team, your Spring 2027 bonus payroll has been confirmed. $28,684.58 has been submitted for direct deposit on May 15. Keep up the phenomenal work!');
  const [ttsVoice, setTtsVoice] = useState('Kore');
  const [isTtsLoading, setIsTtsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  // Veo Video State
  const [videoPrompt, setVideoPrompt] = useState('Small business team celebrating milestone with confetti and smiles');
  const [videoAspectRatio, setVideoAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [videoImage, setVideoImage] = useState<string>('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80');
  const [isVideoGenerating, setIsVideoGenerating] = useState(false);
  const [videoStatusMessage, setVideoStatusMessage] = useState('');
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);

  // Payroll Submission State
  const [isPayrollSubmitting, setIsPayrollSubmitting] = useState(false);
  const [payrollSuccess, setPayrollSuccess] = useState(false);

  // Team Overview States & Edit Modal
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [editName, setEditName] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editDepartment, setEditDepartment] = useState('');
  const [editCompensation, setEditCompensation] = useState<number>(6500);
  const [editStatus, setEditStatus] = useState<'active' | 'onboarding' | 'leave' | 'inactive'>('active');
  const [editType, setEditType] = useState<'full-time' | 'part-time' | 'contractor'>('full-time');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [isSavingEmployee, setIsSavingEmployee] = useState(false);

  // Add Employee Form State
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [newEmpName, setNewEmpName] = useState('');
  const [newEmpRole, setNewEmpRole] = useState('');
  const [newEmpDept, setNewEmpDept] = useState('Engineering');
  const [newEmpSalary, setNewEmpSalary] = useState<number>(7500);
  const [newEmpType, setNewEmpType] = useState<'full-time' | 'part-time' | 'contractor'>('full-time');
  const [newEmpStatus, setNewEmpStatus] = useState<'active' | 'onboarding' | 'leave' | 'inactive'>('active');
  const [newEmpEmail, setNewEmpEmail] = useState('');
  const [newEmpPhone, setNewEmpPhone] = useState('');

  // Team Overview Filters
  const [teamSearchQuery, setTeamSearchQuery] = useState('');
  const [teamStatusFilter, setTeamStatusFilter] = useState<'all' | 'active' | 'onboarding' | 'leave' | 'inactive'>('all');
  const [teamDeptFilter, setTeamDeptFilter] = useState('all');

  // Open Edit Modal for Employee
  const handleOpenEditEmployee = (emp: Employee) => {
    setEditingEmployee(emp);
    setEditName(emp.name);
    setEditRole(emp.role);
    setEditDepartment(emp.department);
    setEditCompensation(emp.compensation || 0);
    setEditStatus(emp.status || 'active');
    setEditType(emp.type || 'full-time');
    setEditEmail(emp.email || '');
    setEditPhone(emp.phone || '');
  };

  // Save Edited Employee
  const handleSaveEditEmployee = async () => {
    if (!editingEmployee) return;
    setIsSavingEmployee(true);
    const uid = user ? user.uid : 'demo-admin';

    const updatedEmp: Employee = {
      ...editingEmployee,
      name: editName.trim() || editingEmployee.name,
      role: editRole.trim() || editingEmployee.role,
      department: editDepartment.trim() || editingEmployee.department,
      compensation: Number(editCompensation) || editingEmployee.compensation,
      status: editStatus,
      type: editType,
      email: editEmail.trim() || editingEmployee.email,
      phone: editPhone.trim() || editingEmployee.phone,
    };

    try {
      await saveEmployee(uid, updatedEmp);
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === updatedEmp.id ? updatedEmp : emp))
      );
      setContactSuccessMsg(`Updated ${updatedEmp.name}'s salary ($${updatedEmp.compensation?.toLocaleString()}/mo) and status (${updatedEmp.status.toUpperCase()})!`);
      setTimeout(() => setContactSuccessMsg(''), 4500);
      setEditingEmployee(null);
    } catch (err: any) {
      console.error(err);
      alert(`Error updating employee: ${err.message}`);
    } finally {
      setIsSavingEmployee(false);
    }
  };

  // Delete Employee
  const handleDeleteEmployee = async (employeeId: string, employeeName: string) => {
    if (!confirm(`Are you sure you want to remove ${employeeName} from the company roster?`)) return;
    const uid = user ? user.uid : 'demo-admin';

    try {
      await deleteEmployee(uid, employeeId);
      setEmployees((prev) => prev.filter((e) => e.id !== employeeId));
      setContactSuccessMsg(`Removed ${employeeName} from team roster.`);
      setTimeout(() => setContactSuccessMsg(''), 4000);
      if (editingEmployee?.id === employeeId) setEditingEmployee(null);
    } catch (err: any) {
      console.error(err);
      alert(`Error removing employee: ${err.message}`);
    }
  };

  // Create New Employee
  const handleCreateNewEmployee = async () => {
    if (!newEmpName.trim()) return;
    const uid = user ? user.uid : 'demo-admin';

    const newEmp: Omit<Employee, 'userId'> = {
      id: `emp-custom-${Date.now()}`,
      name: newEmpName.trim(),
      email: newEmpEmail.trim() || `${newEmpName.toLowerCase().replace(/\s+/g, '.')}@acmecompany.com`,
      phone: newEmpPhone.trim() || '+1 (555) 012-3456',
      role: newEmpRole.trim() || 'Team Member',
      department: newEmpDept || 'Engineering',
      type: newEmpType,
      compensation: Number(newEmpSalary) || 6000,
      status: newEmpStatus,
      source: 'Direct Add',
      createdAt: new Date().toISOString(),
    };

    try {
      await saveEmployee(uid, newEmp);
      setEmployees((prev) => [...prev, { ...newEmp, userId: uid }]);
      setContactSuccessMsg(`Added ${newEmp.name} to Gusto Team Roster!`);
      setTimeout(() => setContactSuccessMsg(''), 4000);
      setShowAddEmployeeModal(false);
      setNewEmpName('');
      setNewEmpRole('');
      setNewEmpEmail('');
      setNewEmpPhone('');
    } catch (err: any) {
      alert(`Error creating employee: ${err.message}`);
    }
  };

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Load Employees and Payrolls from Firestore when user changes
  useEffect(() => {
    if (!isOpen) return;

    const uid = user ? user.uid : 'demo-admin';
    getEmployees(uid).then((data) => {
      if (data) setEmployees(data);
    }).catch(console.error);

    getPayrolls(uid).then((data) => {
      if (data) setPayrolls(data);
    }).catch(console.error);
  }, [isOpen, user]);

  if (!isOpen) return null;

  // Handle Google Contacts Fetch
  const handleLoadGoogleContacts = async () => {
    setIsContactsLoading(true);
    setContactsError(null);
    try {
      const contacts = await fetchGoogleContacts();
      setGoogleContacts(contacts);
    } catch (err: any) {
      console.error(err);
      setContactsError(
        err.message || 'Please sign in with Google to grant Contacts access.'
      );
    } finally {
      setIsContactsLoading(false);
    }
  };

  // Import a Google Contact to Gusto Employee Team
  const handleImportContact = async (contact: GoogleContact) => {
    const uid = user ? user.uid : 'demo-admin';
    const newEmp: Omit<Employee, 'userId'> = {
      id: `emp-google-${Date.now()}`,
      name: contact.name,
      email: contact.email || `${contact.name.toLowerCase().replace(/\s+/g, '.')}@acmecompany.com`,
      phone: contact.phone || '+1 (555) 000-0000',
      role: contact.jobTitle || 'Team Member',
      department: 'General Operations',
      type: 'full-time',
      compensation: 6500,
      status: 'active',
      source: 'Google Workspace Contacts',
      createdAt: new Date().toISOString(),
    };

    await saveEmployee(uid, newEmp);
    setEmployees((prev) => [...prev, { ...newEmp, userId: uid }]);
    setContactSuccessMsg(`Imported ${contact.name} to Gusto Team Roster!`);
    setTimeout(() => setContactSuccessMsg(''), 4000);
  };

  // Create Google Contact (With explicit confirmation as mandated by workspace skill)
  const handleConfirmCreateContact = async () => {
    if (!newGivenName || !newEmail) return;

    setIsCreatingContact(true);
    try {
      const created = await createGoogleContact({
        givenName: newGivenName,
        familyName: newFamilyName,
        email: newEmail,
        phoneNumber: newPhone,
        jobTitle: newRole,
        company: 'Acme Company',
      });

      setGoogleContacts((prev) => [created, ...prev]);
      setShowAddContactModal(false);
      setNewGivenName('');
      setNewFamilyName('');
      setNewEmail('');
      setNewPhone('');
      setNewRole('');
      setContactSuccessMsg(`Successfully created contact ${created.name} in Google Contacts!`);
      setTimeout(() => setContactSuccessMsg(''), 4000);
    } catch (err: any) {
      alert(`Error creating Google Contact: ${err.message}`);
    } finally {
      setIsCreatingContact(false);
    }
  };

  // Submit Payroll Run with Audio Announcement
  const handleProcessPayroll = async () => {
    setIsPayrollSubmitting(true);
    const uid = user ? user.uid : 'demo-admin';

    const currentRun: PayrollRun = {
      id: `payroll-${Date.now()}`,
      userId: uid,
      title: 'Spring bonus 2027',
      period: 'May 1 – May 15, 2027',
      payday: 'May 15, 2027',
      submitBy: 'May 14, 2027',
      totalAmount: 28684.58,
      employeesCount: employees.length || 5,
      status: 'completed',
      directDepositDate: 'May 15, 2027',
      createdAt: new Date().toISOString(),
    };

    try {
      await submitPayrollRun(uid, currentRun);
      setPayrolls((prev) => [currentRun, ...prev.filter((p) => p.id !== currentRun.id)]);
      setPayrollSuccess(true);

      // Play synthesized audio announcement
      fetch('/api/gemini/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `Success! Gusto has confirmed the Spring Bonus payroll of $28,684.58 for ${employees.length} team members. Direct deposits are queued for payday on May 15.`,
          voice: 'Kore',
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.audioData) {
            playRawBase64Audio(data.audioData);
          }
        })
        .catch(console.error);
    } catch (err: any) {
      console.error(err);
      alert('Error submitting payroll: ' + err.message);
    } finally {
      setIsPayrollSubmitting(false);
    }
  };

  // Run AI Analysis
  const handleRunAi = async () => {
    setIsAiLoading(true);
    setAiResult('');
    setMapSources([]);
    try {
      let endpoint = '/api/gemini/analyze';
      let payload: any = { prompt: aiPrompt, contextData: { employees, payrolls } };

      if (aiMode === 'fast') {
        endpoint = '/api/gemini/quick';
        payload = { prompt: aiPrompt };
      } else if (aiMode === 'maps') {
        endpoint = '/api/gemini/maps';
        payload = {
          query: aiPrompt || 'Find certified payroll CPAs and IRS Taxpayer Assistance Centers in San Francisco',
          location: { lat: 37.7749, lng: -122.4194 },
        };
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setAiResult(data.text);
      setAiModelUsed(data.model);
      if (data.mapSources) setMapSources(data.mapSources);

      // Save task to Firestore
      if (user) {
        saveAiTaskRecord(user.uid, {
          id: `task-${Date.now()}`,
          type: aiMode,
          prompt: aiPrompt,
          modelUsed: data.model,
          result: data.text,
          createdAt: new Date().toISOString(),
        }).catch(console.error);
      }
    } catch (err: any) {
      setAiResult(`Error: ${err.message}`);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Helper to play raw PCM / audio data
  const playRawBase64Audio = (base64Data: string) => {
    try {
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      const audio = new Audio(url);
      audio.play().catch((e) => console.log('Audio autoplay prevented:', e));
    } catch (e) {
      console.error('Audio playback error:', e);
    }
  };

  // Run TTS
  const handleGenerateTts = async () => {
    setIsTtsLoading(true);
    setAudioUrl(null);
    try {
      const res = await fetch('/api/gemini/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: ttsText,
          voice: ttsVoice,
          style: 'Executive, reassuring, and articulate company spokesperson',
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      if (data.audioData) {
        playRawBase64Audio(data.audioData);
      }
    } catch (err: any) {
      alert(`TTS generation error: ${err.message}`);
    } finally {
      setIsTtsLoading(false);
    }
  };

  // Handle Image Upload for Veo
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setVideoImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Run Veo Video Generation
  const handleGenerateVideo = async () => {
    setIsVideoGenerating(true);
    setVideoStatusMessage('Initializing Veo video generation pipeline...');
    setGeneratedVideoUrl(null);

    try {
      const res = await fetch('/api/gemini/video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: videoImage,
          prompt: videoPrompt,
          aspectRatio: videoAspectRatio,
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const opName = data.operationName;
      setVideoStatusMessage('Rendering high-fidelity frames with Veo model... (polling)');

      // Poll until done
      let attempts = 0;
      const interval = setInterval(async () => {
        attempts++;
        try {
          const statusRes = await fetch('/api/gemini/video-status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ operationName: opName }),
          });
          const statusData = await statusRes.json();

          if (statusData.done) {
            clearInterval(interval);
            setVideoStatusMessage('Downloading completed celebration video...');
            // Fetch download stream
            const downloadRes = await fetch('/api/gemini/video-download', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ operationName: opName }),
            });

            if (!downloadRes.ok) throw new Error('Download failed');
            const blob = await downloadRes.blob();
            const blobUrl = URL.createObjectURL(blob);
            setGeneratedVideoUrl(blobUrl);
            setVideoStatusMessage('Video rendered successfully!');
            setIsVideoGenerating(false);
          } else {
            setVideoStatusMessage(
              `Processing video motion vectors... (${attempts * 4}s elapsed)`
            );
          }
        } catch (pollErr: any) {
          clearInterval(interval);
          setIsVideoGenerating(false);
          setVideoStatusMessage(`Polling error: ${pollErr.message}`);
        }
      }, 4000);
    } catch (err: any) {
      setIsVideoGenerating(false);
      setVideoStatusMessage(`Error: ${err.message}`);
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const q = teamSearchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      emp.name.toLowerCase().includes(q) ||
      emp.role.toLowerCase().includes(q) ||
      emp.department.toLowerCase().includes(q) ||
      emp.email.toLowerCase().includes(q);

    const matchesStatus =
      teamStatusFilter === 'all' || emp.status === teamStatusFilter;

    const matchesDept =
      teamDeptFilter === 'all' || emp.department === teamDeptFilter;

    return matchesSearch && matchesStatus && matchesDept;
  });

  const totalMonthlyPayroll = employees.reduce(
    (acc, emp) => acc + (emp.status !== 'inactive' ? (emp.compensation || 0) : 0),
    0
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-[32px] max-w-5xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-4">
        {/* Top Header Bar */}
        <div className="bg-[#FAF9F7] px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-bold text-[#F25238] text-xl tracking-tight">gusto</span>
            <span className="text-gray-300">|</span>
            <h2 className="font-semibold text-gray-800 text-sm sm:text-base flex items-center gap-2">
              <span>Interactive Platform Console</span>
              {user ? (
                <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  Synced: {user.displayName || user.email}
                </span>
              ) : (
                <span className="text-[11px] bg-amber-100 text-amber-900 font-medium px-2 py-0.5 rounded-full">
                  Sandbox Mode
                </span>
              )}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {!user && (
              <button
                onClick={onSignIn}
                className="text-xs bg-[#0A3B34] text-white hover:bg-[#072A25] px-3.5 py-1.5 rounded-full font-bold transition cursor-pointer"
              >
                Sign in with Google
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-black w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 text-lg font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-gray-200 bg-white px-6 text-xs font-semibold text-gray-600 no-scrollbar">
          <button
            onClick={() => setActiveTab('team')}
            className={`py-3.5 px-4 border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'team'
                ? 'border-[#F25238] text-[#F25238] font-bold'
                : 'border-transparent hover:text-black'
            }`}
          >
            👥 Team Overview
          </button>
          <button
            onClick={() => setActiveTab('payroll')}
            className={`py-3.5 px-4 border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'payroll'
                ? 'border-[#F25238] text-[#F25238]'
                : 'border-transparent hover:text-black'
            }`}
          >
            💳 Payroll & AutoPilot™
          </button>
          <button
            onClick={() => setActiveTab('chatbot')}
            className={`py-3.5 px-4 border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'chatbot'
                ? 'border-[#F25238] text-[#F25238] font-bold'
                : 'border-transparent hover:text-black'
            }`}
          >
            💬 Gusto AI Copilot
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`py-3.5 px-4 border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'contacts'
                ? 'border-[#F25238] text-[#F25238]'
                : 'border-transparent hover:text-black'
            }`}
          >
            📇 Google Contacts
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`py-3.5 px-4 border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'ai'
                ? 'border-[#F25238] text-[#F25238]'
                : 'border-transparent hover:text-black'
            }`}
          >
            ✨ Gemini AI & Maps
          </button>
          <button
            onClick={() => setActiveTab('tts')}
            className={`py-3.5 px-4 border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'tts'
                ? 'border-[#F25238] text-[#F25238]'
                : 'border-transparent hover:text-black'
            }`}
          >
            🎙️ Voice Studio
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`py-3.5 px-4 border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'video'
                ? 'border-[#F25238] text-[#F25238]'
                : 'border-transparent hover:text-black'
            }`}
          >
            🎬 Veo Studio
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#FCFAF7]">
          {contactSuccessMsg && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
              <span>✓</span> {contactSuccessMsg}
            </div>
          )}

          {/* TAB: TEAM OVERVIEW */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              {/* Top Stats Banner */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                    Total Team
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold text-gray-900">{employees.length}</span>
                    <span className="text-xs text-emerald-600 font-medium">
                      {employees.filter((e) => e.status === 'active').length} active
                    </span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                    Monthly Payroll
                  </span>
                  <div className="mt-1">
                    <span className="text-2xl font-bold text-[#0A3B34]">
                      ${totalMonthlyPayroll.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-gray-400 block font-normal">/ month current</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                    Annual Run Rate
                  </span>
                  <div className="mt-1">
                    <span className="text-2xl font-bold text-gray-800">
                      ${(totalMonthlyPayroll * 12).toLocaleString()}
                    </span>
                    <span className="text-[11px] text-gray-400 block font-normal">estimated total</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                    Status Overview
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold text-[10px]">
                      ● {employees.filter((e) => e.status === 'active').length} Active
                    </span>
                    <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-bold text-[10px]">
                      ● {employees.filter((e) => e.status === 'leave').length} Leave
                    </span>
                    <span className="inline-flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full font-bold text-[10px]">
                      ● {employees.filter((e) => e.status === 'onboarding').length} Onboarding
                    </span>
                  </div>
                </div>
              </div>

              {/* Main Team Table Card */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Header & Controls */}
                <div className="p-5 sm:p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900 text-lg sm:text-xl">Team Directory</h3>
                      <span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-0.5 rounded-full font-bold">
                        {employees.length} Members
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      View and manage employees, current salaries, compensation rates, and status.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* Search Bar */}
                    <div className="relative">
                      <input
                        type="text"
                        value={teamSearchQuery}
                        onChange={(e) => setTeamSearchQuery(e.target.value)}
                        placeholder="Search employee, role..."
                        className="text-xs bg-[#FAF9F7] border border-gray-200 rounded-full pl-8 pr-3 py-2 w-48 sm:w-56 focus:outline-none focus:ring-2 focus:ring-[#F25238] focus:bg-white"
                      />
                      <span className="absolute left-2.5 top-2.5 text-gray-400 text-xs">🔍</span>
                      {teamSearchQuery && (
                        <button
                          onClick={() => setTeamSearchQuery('')}
                          className="absolute right-2.5 top-2.5 text-gray-400 hover:text-black text-xs"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => setShowAddEmployeeModal(true)}
                      className="bg-[#0A3B34] hover:bg-[#072A25] text-white text-xs px-4 py-2 rounded-full font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <span>+</span>
                      <span>Add Employee</span>
                    </button>
                  </div>
                </div>

                {/* Filter Tabs & Department Filter */}
                <div className="px-5 sm:px-6 py-2.5 bg-[#FAF9F7] border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mr-1">
                      Status:
                    </span>
                    {(['all', 'active', 'onboarding', 'leave', 'inactive'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setTeamStatusFilter(st)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer capitalize ${
                          teamStatusFilter === st
                            ? 'bg-[#0A3B34] text-white'
                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-400 font-medium">Department:</span>
                    <select
                      value={teamDeptFilter}
                      onChange={(e) => setTeamDeptFilter(e.target.value)}
                      className="bg-white border border-gray-200 text-xs rounded-lg px-2 py-1 text-gray-700"
                    >
                      <option value="all">All Departments</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Design">Design</option>
                      <option value="Management">Management</option>
                      <option value="Marketing">Marketing</option>
                      <option value="General Operations">Operations</option>
                    </select>
                    <span className="text-gray-400 text-[11px] whitespace-nowrap ml-1">
                      ({filteredEmployees.length} shown)
                    </span>
                  </div>
                </div>

                {/* Employees Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-gray-100 bg-[#FAF9F7]/60 text-gray-400 uppercase tracking-wider font-semibold text-[10px]">
                        <th className="py-3.5 px-5">Employee</th>
                        <th className="py-3.5 px-4">Role & Dept</th>
                        <th className="py-3.5 px-4">Current Salary</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4">Type</th>
                        <th className="py-3.5 px-5 text-right">Quick Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredEmployees.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-gray-400 text-xs">
                            No employees match your search or filter.
                          </td>
                        </tr>
                      ) : (
                        filteredEmployees.map((emp) => {
                          const statusClasses = {
                            active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                            onboarding: 'bg-blue-50 text-blue-700 border-blue-200',
                            leave: 'bg-amber-50 text-amber-700 border-amber-200',
                            inactive: 'bg-gray-100 text-gray-600 border-gray-200',
                          };

                          return (
                            <tr key={emp.id} className="hover:bg-[#FAF9F7]/70 transition">
                              {/* Employee Name & Contact */}
                              <td className="py-3.5 px-5">
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0A3B34] to-[#12584D] text-white flex items-center justify-center font-bold text-xs shadow-2xs shrink-0">
                                    {emp.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                                  </div>
                                  <div>
                                    <strong className="text-gray-900 text-sm block font-semibold">
                                      {emp.name}
                                    </strong>
                                    <span className="text-gray-400 text-[11px] block">
                                      {emp.email}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* Role & Department */}
                              <td className="py-3.5 px-4">
                                <span className="font-semibold text-gray-800 block">{emp.role}</span>
                                <span className="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full inline-block mt-0.5 font-medium">
                                  {emp.department}
                                </span>
                              </td>

                              {/* Current Salary */}
                              <td className="py-3.5 px-4">
                                <div className="flex flex-col">
                                  <span className="font-bold text-base text-[#0A3B34]">
                                    ${(emp.compensation || 0).toLocaleString()}
                                    <span className="text-xs font-normal text-gray-500">/mo</span>
                                  </span>
                                  <span className="text-[10px] text-gray-400 font-medium">
                                    ${((emp.compensation || 0) * 12).toLocaleString()} / year
                                  </span>
                                </div>
                              </td>

                              {/* Status */}
                              <td className="py-3.5 px-4">
                                <span
                                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border capitalize ${
                                    statusClasses[emp.status] || statusClasses.active
                                  }`}
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                  {emp.status}
                                </span>
                              </td>

                              {/* Employment Type */}
                              <td className="py-3.5 px-4">
                                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                                  {emp.type || 'full-time'}
                                </span>
                              </td>

                              {/* Quick-Action Edit Button */}
                              <td className="py-3.5 px-5 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => handleOpenEditEmployee(emp)}
                                    className="bg-white hover:bg-[#F25238] text-gray-700 hover:text-white border border-gray-300 hover:border-[#F25238] px-3.5 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 shadow-2xs cursor-pointer group"
                                  >
                                    <span>✏️</span>
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    onClick={() => handleDeleteEmployee(emp.id, emp.name)}
                                    className="text-gray-300 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition cursor-pointer"
                                    title="Delete Employee"
                                  >
                                    🗑️
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: GUSTO AI COPILOT CHATBOT */}
          {activeTab === 'chatbot' && (
            <div className="space-y-4">
              <GeminiChatbot embedded={true} />
            </div>
          )}

          {/* TAB 1: PAYROLL RUNNER */}
          {activeTab === 'payroll' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      Step 4 of 4 • AutoPilot™ Active
                    </span>
                    <h3 className="editorial-serif text-3xl font-semibold text-gray-900 mt-1">
                      Spring bonus 2027
                    </h3>
                    <p className="text-xs text-gray-500">Check date: May 15, 2027 • Acme Company</p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-gray-400 block">Total Payroll Amount</span>
                    <span className="text-3xl font-black text-[#0A3B34]">$28,684.58</span>
                  </div>
                </div>

                {/* Team Members Breakdown Table */}
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="text-[11px] text-gray-400 uppercase tracking-wider border-b border-gray-100">
                      <tr>
                        <th className="pb-2">Employee / Role</th>
                        <th className="pb-2">Type</th>
                        <th className="pb-2 text-right">Gross Bonus</th>
                        <th className="pb-2 text-right">Taxes & Withholding</th>
                        <th className="pb-2 text-right">Net Take-Home</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {employees.map((emp) => {
                        const gross = emp.compensation || 7000;
                        const taxes = Math.round(gross * 0.22);
                        const net = gross - taxes;
                        return (
                          <tr key={emp.id} className="hover:bg-gray-50">
                            <td className="py-3 font-semibold text-gray-900">
                              {emp.name}
                              <span className="block text-[11px] font-normal text-gray-500">
                                {emp.role} • {emp.department}
                              </span>
                            </td>
                            <td className="py-3">
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-[10px] font-bold">
                                {emp.type}
                              </span>
                            </td>
                            <td className="py-3 text-right font-medium text-gray-800">
                              ${gross.toLocaleString()}
                            </td>
                            <td className="py-3 text-right text-rose-600">
                              -${taxes.toLocaleString()}
                            </td>
                            <td className="py-3 text-right font-bold text-[#0A3B34]">
                              ${net.toLocaleString()}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Actions */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs text-gray-500">
                    <p className="font-semibold text-gray-800">
                      Direct deposit withdrawal: <strong>$28,684.58</strong>
                    </p>
                    <p className="text-[11px] text-gray-400">
                      Debited on submit. Funds arrive May 15. Audio confirmation will play.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleProcessPayroll}
                      disabled={isPayrollSubmitting}
                      className={`px-8 py-3 rounded-full text-xs font-bold text-white shadow-md transition cursor-pointer ${
                        payrollSuccess
                          ? 'bg-emerald-600'
                          : isPayrollSubmitting
                          ? 'bg-gray-400 animate-pulse'
                          : 'bg-[#F25238] hover:bg-[#DE452C] hover:scale-105 active:scale-95'
                      }`}
                    >
                      {payrollSuccess
                        ? '✓ Submitted & Debited'
                        : isPayrollSubmitting
                        ? 'Processing...'
                        : 'Confirm & Submit Payroll'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Past Payroll History */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200">
                <h4 className="font-bold text-sm text-gray-900 mb-3">Recent Payroll Runs (Firestore Synced)</h4>
                <div className="space-y-2">
                  {payrolls.map((run) => (
                    <div
                      key={run.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs"
                    >
                      <div>
                        <strong className="text-gray-900">{run.title}</strong>
                        <span className="text-gray-400 ml-2">({run.period})</span>
                        <p className="text-[11px] text-gray-500">Payday: {run.payday}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-gray-900">${run.totalAmount?.toLocaleString()}</span>
                        <span className={`block text-[10px] font-bold ${
                          run.status === 'completed' ? 'text-emerald-600' : 'text-amber-600'
                        }`}>
                          {run.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GOOGLE CONTACTS & TEAM ROSTER */}
          {activeTab === 'contacts' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="editorial-serif text-3xl font-semibold text-gray-900">
                      Google Workspace Contacts Integration
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Connect directly to your Google Account to import team members, contractors, and emergency contacts.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleLoadGoogleContacts}
                      disabled={isContactsLoading}
                      className="bg-[#0A3B34] hover:bg-[#072A25] text-white px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>🔄</span>
                      {isContactsLoading ? 'Syncing...' : 'Fetch Google Contacts'}
                    </button>
                    <button
                      onClick={() => setShowAddContactModal(true)}
                      className="border border-gray-300 hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer"
                    >
                      + Add New Contact
                    </button>
                  </div>
                </div>

                {contactsError && (
                  <div className="mt-4 p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl text-xs space-y-2">
                    <p className="font-bold">Google Contacts Authorization Required:</p>
                    <p>{contactsError}</p>
                    <button
                      onClick={onSignIn}
                      className="bg-[#0A3B34] text-white px-4 py-1.5 rounded-full font-bold text-xs cursor-pointer hover:bg-[#072A25]"
                    >
                      Sign In & Grant Contacts Permission
                    </button>
                  </div>
                )}

                {/* Google Contacts List */}
                {googleContacts.length > 0 ? (
                  <div className="mt-6 space-y-3">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Contacts found in your Google Account ({googleContacts.length}):
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                      {googleContacts.map((c, i) => (
                        <div
                          key={i}
                          className="p-3 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            {c.photoUrl ? (
                              <img src={c.photoUrl} alt={c.name} className="w-8 h-8 rounded-full" />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs">
                                {c.name[0]}
                              </div>
                            )}
                            <div>
                              <p className="font-bold text-gray-900">{c.name}</p>
                              <p className="text-[11px] text-gray-500">{c.email || c.phone}</p>
                            </div>
                          </div>

                          <button
                            onClick={() => handleImportContact(c)}
                            className="bg-[#D1F2E7] hover:bg-[#b5e7d6] text-[#0A433D] px-3 py-1.5 rounded-full font-bold text-[11px] transition cursor-pointer"
                          >
                            + Import to Gusto
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 p-6 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-xs text-gray-500">
                    <p>Click <strong>"Fetch Google Contacts"</strong> to load contacts from your Google Account.</p>
                  </div>
                )}
              </div>

              {/* Current Gusto Team Roster */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-base text-gray-900">Current Gusto Team Roster ({employees.length})</h4>
                  <span className="text-xs text-gray-400">Stored persistently in Firestore</span>
                </div>
                <div className="space-y-2">
                  {employees.map((emp) => (
                    <div
                      key={emp.id}
                      className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-teal-100 text-[#0A3B34] flex items-center justify-center font-bold">
                          {emp.name[0]}
                        </span>
                        <div>
                          <strong className="text-gray-900 text-sm">{emp.name}</strong>
                          <span className="ml-2 text-gray-500">{emp.role} • {emp.department}</span>
                          <p className="text-[11px] text-gray-400">{emp.email} • {emp.phone}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-[#0A3B34]">${emp.compensation?.toLocaleString()}/mo</span>
                        <span className="block text-[10px] uppercase font-bold text-gray-400">{emp.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GEMINI AI & MAPS GROUNDING */}
          {activeTab === 'ai' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="editorial-serif text-3xl font-semibold text-gray-900">
                      Gemini Intelligence & Local Advisor Grounding
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Multi-tier intelligence: Complex reasoning, fast payroll math, and live Google Maps grounding.
                    </p>
                  </div>

                  {/* Mode Selector */}
                  <div className="flex bg-gray-100 p-1 rounded-full text-xs font-semibold">
                    <button
                      onClick={() => {
                        setAiMode('complex');
                        setAiPrompt('Audit multi-state payroll withholding rules and identify federal R&D tax credit eligibility for our 5-person team.');
                      }}
                      className={`px-3 py-1.5 rounded-full transition cursor-pointer ${
                        aiMode === 'complex' ? 'bg-[#0A3B34] text-white' : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      Complex (3.1 Pro)
                    </button>
                    <button
                      onClick={() => {
                        setAiMode('fast');
                        setAiPrompt('Calculate employer FICA match, FUTA, and estimated state unemployment tax for an $8,500 monthly salary.');
                      }}
                      className={`px-3 py-1.5 rounded-full transition cursor-pointer ${
                        aiMode === 'fast' ? 'bg-[#0A3B34] text-white' : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      Fast Math (Flash-Lite)
                    </button>
                    <button
                      onClick={() => {
                        setAiMode('maps');
                        setAiPrompt('Find certified small business CPA firms and IRS Taxpayer Assistance Centers near San Francisco, CA.');
                      }}
                      className={`px-3 py-1.5 rounded-full transition cursor-pointer ${
                        aiMode === 'maps' ? 'bg-[#0A3B34] text-white' : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      Maps Grounding (3.5 Flash)
                    </button>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  <textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    rows={3}
                    placeholder="Enter prompt for Gusto AI assistant..."
                    className="w-full text-xs p-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0A3B34] bg-[#FAF9F7]"
                  />

                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-gray-400">
                      Model Target:{' '}
                      <strong className="text-gray-700">
                        {aiMode === 'complex'
                          ? 'gemini-3.1-pro-preview'
                          : aiMode === 'fast'
                          ? 'gemini-3.1-flash-lite'
                          : 'gemini-3.5-flash with Google Maps tool'}
                      </strong>
                    </span>

                    <button
                      onClick={handleRunAi}
                      disabled={isAiLoading}
                      className="bg-[#0A3B34] hover:bg-[#072A25] text-white px-6 py-2 rounded-full text-xs font-bold transition shadow-sm cursor-pointer"
                    >
                      {isAiLoading ? 'Analyzing...' : 'Run Intelligence Task'}
                    </button>
                  </div>
                </div>

                {/* AI Output Result */}
                {aiResult && (
                  <div className="mt-6 p-5 rounded-2xl bg-gray-50 border border-gray-200">
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="font-bold text-[#0A3B34] flex items-center gap-1.5">
                        <span>✨</span> Gemini Output ({aiModelUsed})
                      </span>
                      <span className="text-gray-400 text-[10px]">Grounded & Verified</span>
                    </div>

                    <div className="prose prose-sm text-xs text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {aiResult}
                    </div>

                    {/* Google Maps Grounding Links */}
                    {mapSources.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                          Google Maps Grounding Locations & Verified Review Sources:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {mapSources.map((map, idx) => (
                            <a
                              key={idx}
                              href={map.uri}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2.5 rounded-xl bg-white border border-gray-200 hover:border-emerald-500 hover:shadow-sm transition block text-xs"
                            >
                              <div className="flex items-center gap-1.5 font-bold text-[#0A3B34]">
                                <span>📍</span>
                                <span className="hover:underline">{map.title}</span>
                              </div>
                              {map.snippet && (
                                <p className="text-[10px] text-gray-500 mt-1 line-clamp-2 italic">
                                  "{map.snippet}"
                                </p>
                              )}
                              <span className="text-[10px] text-blue-600 underline block mt-1">
                                Open in Google Maps ↗
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: VOICE AUDIO STUDIO (TTS) */}
          {activeTab === 'tts' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                <div className="pb-4 border-b border-gray-100">
                  <h3 className="editorial-serif text-3xl font-semibold text-gray-900">
                    Voice Briefing Studio (TTS)
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Powered by model: <strong className="text-gray-800">gemini-3.8-flash-tts</strong>.
                    Synthesizes natural, expressive voice briefings for payroll reminders, company updates, and bonus celebrations.
                  </p>
                </div>

                <div className="mt-5 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Script to Speak:
                    </label>
                    <textarea
                      value={ttsText}
                      onChange={(e) => setTtsText(e.target.value)}
                      rows={3}
                      className="w-full text-xs p-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0A3B34] bg-[#FAF9F7]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Voice Persona:
                      </label>
                      <select
                        value={ttsVoice}
                        onChange={(e) => setTtsVoice(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-white"
                      >
                        <option value="Kore">Kore (Warm, Professional Narrator)</option>
                        <option value="Puck">Puck (Enthusiastic & Bright)</option>
                        <option value="Charon">Charon (Deep & Reassuring)</option>
                        <option value="Fenrir">Fenrir (Authoritative Executive)</option>
                        <option value="Zephyr">Zephyr (Modern & Friendly)</option>
                      </select>
                    </div>

                    <div className="flex items-end">
                      <button
                        onClick={handleGenerateTts}
                        disabled={isTtsLoading}
                        className="w-full bg-[#0A3B34] hover:bg-[#072A25] text-white py-2.5 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                      >
                        {isTtsLoading ? 'Generating Speech...' : '🎙️ Synthesize Speech with Gemini TTS'}
                      </button>
                    </div>
                  </div>

                  {audioUrl && (
                    <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold text-emerald-950">Audio Briefing Ready</p>
                        <p className="text-[11px] text-emerald-700">Synthesized with gemini-3.8-flash-tts ({ttsVoice})</p>
                      </div>
                      <audio controls src={audioUrl} className="h-9" autoPlay />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: VEO VIDEO CELEBRATION STUDIO */}
          {activeTab === 'video' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                <div className="pb-4 border-b border-gray-100">
                  <h3 className="editorial-serif text-3xl font-semibold text-gray-900">
                    Team Culture Video Studio (Veo)
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Powered by model: <strong className="text-gray-800">veo-3.1-fast-generate-preview</strong>.
                    Upload a team photo to animate it into a cinematic celebration video.
                  </p>
                </div>

                <div className="mt-5 space-y-4">
                  {/* Photo Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Starting Photo:
                      </label>
                      <div className="flex items-center gap-3">
                        <img
                          src={videoImage}
                          alt="Team preview"
                          className="w-24 h-20 rounded-xl object-cover border border-gray-300 shadow-sm"
                        />
                        <div className="space-y-1">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="text-xs file:mr-2 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#0A3B34] file:text-white hover:file:bg-[#072A25] cursor-pointer"
                          />
                          <p className="text-[10px] text-gray-400">Upload team selfie or office photo</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Aspect Ratio:
                      </label>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setVideoAspectRatio('16:9')}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                            videoAspectRatio === '16:9'
                              ? 'bg-[#0A3B34] text-white border-[#0A3B34]'
                              : 'bg-white text-gray-700 border-gray-200'
                          }`}
                        >
                          16:9 (Landscape)
                        </button>
                        <button
                          type="button"
                          onClick={() => setVideoAspectRatio('9:16')}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                            videoAspectRatio === '9:16'
                              ? 'bg-[#0A3B34] text-white border-[#0A3B34]'
                              : 'bg-white text-gray-700 border-gray-200'
                          }`}
                        >
                          9:16 (Portrait)
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Celebration Video Prompt:
                    </label>
                    <input
                      type="text"
                      value={videoPrompt}
                      onChange={(e) => setVideoPrompt(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-gray-200 bg-[#FAF9F7]"
                    />
                  </div>

                  <button
                    onClick={handleGenerateVideo}
                    disabled={isVideoGenerating}
                    className="w-full bg-[#F25238] hover:bg-[#DE452C] text-white py-3 rounded-full text-xs font-bold transition shadow-sm cursor-pointer"
                  >
                    {isVideoGenerating ? 'Rendering Video (Veo)...' : '🎬 Animate Photo into Veo Video'}
                  </button>

                  {videoStatusMessage && (
                    <div className="p-3.5 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl text-xs flex items-center justify-between">
                      <span>{videoStatusMessage}</span>
                      {isVideoGenerating && <span className="animate-spin text-base">⏳</span>}
                    </div>
                  )}

                  {generatedVideoUrl && (
                    <div className="mt-4 p-4 rounded-2xl bg-black/90 text-white space-y-3">
                      <p className="text-xs font-bold text-emerald-400">✓ Video Generation Complete</p>
                      <video
                        controls
                        src={generatedVideoUrl}
                        className={`rounded-xl max-h-80 mx-auto ${
                          videoAspectRatio === '9:16' ? 'w-48' : 'w-full'
                        }`}
                        autoPlay
                        loop
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mandatory User Confirmation Modal for Creating Google Contact (Workspace Skill Rule) */}
      {showAddContactModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-lg text-gray-900">
              Create New Google Contact
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              With your permission, Gusto will create a new contact in your Google Account.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">First Name *</label>
                <input
                  type="text"
                  value={newGivenName}
                  onChange={(e) => setNewGivenName(e.target.value)}
                  placeholder="e.g. Sarah"
                  className="w-full p-2.5 rounded-xl border border-gray-200"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  value={newFamilyName}
                  onChange={(e) => setNewFamilyName(e.target.value)}
                  placeholder="e.g. Jenkins"
                  className="w-full p-2.5 rounded-xl border border-gray-200"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="sarah.j@acmecompany.com"
                  className="w-full p-2.5 rounded-xl border border-gray-200"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+1 (555) 019-2834"
                  className="w-full p-2.5 rounded-xl border border-gray-200"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Role / Job Title</label>
                <input
                  type="text"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  placeholder="Senior Account Executive"
                  className="w-full p-2.5 rounded-xl border border-gray-200"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={handleConfirmCreateContact}
                disabled={isCreatingContact || !newGivenName || !newEmail}
                className="flex-1 bg-[#0A3B34] hover:bg-[#072A25] text-white py-2.5 rounded-full text-xs font-bold transition cursor-pointer"
              >
                {isCreatingContact ? 'Saving to Google...' : 'Confirm & Create in Google'}
              </button>
              <button
                type="button"
                onClick={() => setShowAddContactModal(false)}
                className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-full text-xs font-medium hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK-ACTION EDIT EMPLOYEE MODAL */}
      {editingEmployee && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                  <span>Edit Employee Record</span>
                  <span className="text-xs bg-orange-100 text-[#F25238] font-bold px-2 py-0.5 rounded-full">
                    {editingEmployee.name}
                  </span>
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Update current compensation, employment status, and team assignments.
                </p>
              </div>
              <button
                onClick={() => setEditingEmployee(null)}
                className="text-gray-400 hover:text-black w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-100 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#F25238] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Role / Job Title</label>
                  <input
                    type="text"
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#F25238] focus:outline-none"
                  />
                </div>
              </div>

              {/* Department & Employment Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Department</label>
                  <select
                    value={editDepartment}
                    onChange={(e) => setEditDepartment(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs bg-white"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Management">Management</option>
                    <option value="Sales">Sales</option>
                    <option value="Customer Success">Customer Success</option>
                    <option value="General Operations">General Operations</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Employment Type</label>
                  <select
                    value={editType}
                    onChange={(e) => setEditType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs bg-white"
                  >
                    <option value="full-time">Full-Time (W-2)</option>
                    <option value="part-time">Part-Time (W-2)</option>
                    <option value="contractor">Contractor (1099)</option>
                  </select>
                </div>
              </div>

              {/* CURRENT SALARY SECTION */}
              <div className="bg-[#FAF9F7] p-4 rounded-2xl border border-gray-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-gray-800 text-xs flex items-center gap-1.5">
                    <span>💵 Current Monthly Salary</span>
                  </label>
                  <div className="text-right">
                    <span className="font-black text-sm text-[#0A3B34]">
                      ${Number(editCompensation).toLocaleString()}/mo
                    </span>
                    <span className="text-[10px] text-gray-400 block font-medium">
                      (${(Number(editCompensation) * 12).toLocaleString()}/year)
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400 font-bold">$</span>
                  <input
                    type="number"
                    min="500"
                    max="50000"
                    step="100"
                    value={editCompensation}
                    onChange={(e) => setEditCompensation(Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-2 rounded-xl border border-gray-300 font-bold text-sm bg-white focus:ring-2 focus:ring-[#F25238] focus:outline-none"
                  />
                </div>

                {/* Range Slider for interactive adjustment */}
                <input
                  type="range"
                  min="2000"
                  max="20000"
                  step="250"
                  value={editCompensation}
                  onChange={(e) => setEditCompensation(Number(e.target.value))}
                  className="w-full accent-[#F25238] cursor-pointer"
                />

                {/* Quick adjustment pills */}
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-gray-400 font-semibold">Quick adjust:</span>
                  <button
                    type="button"
                    onClick={() => setEditCompensation((prev) => Math.round(prev * 1.05))}
                    className="bg-white border border-gray-200 hover:border-[#F25238] hover:text-[#F25238] text-[10px] font-bold px-2 py-0.5 rounded-md transition cursor-pointer"
                  >
                    +5% Raise
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditCompensation((prev) => Math.round(prev * 1.1))}
                    className="bg-white border border-gray-200 hover:border-[#F25238] hover:text-[#F25238] text-[10px] font-bold px-2 py-0.5 rounded-md transition cursor-pointer"
                  >
                    +10% Raise
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditCompensation((prev) => Math.max(1000, prev + 500))}
                    className="bg-white border border-gray-200 hover:border-[#F25238] hover:text-[#F25238] text-[10px] font-bold px-2 py-0.5 rounded-md transition cursor-pointer"
                  >
                    +$500
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditCompensation((prev) => Math.max(1000, prev + 1000))}
                    className="bg-white border border-gray-200 hover:border-[#F25238] hover:text-[#F25238] text-[10px] font-bold px-2 py-0.5 rounded-md transition cursor-pointer"
                  >
                    +$1,000
                  </button>
                </div>
              </div>

              {/* EMPLOYMENT STATUS SELECTOR */}
              <div>
                <label className="block font-semibold text-gray-700 mb-1.5">Employment Status</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(
                    [
                      { key: 'active', label: 'Active', desc: 'Active payroll' },
                      { key: 'onboarding', label: 'Onboarding', desc: 'Setup pending' },
                      { key: 'leave', label: 'On Leave', desc: 'Temporary leave' },
                      { key: 'inactive', label: 'Inactive', desc: 'Offboarded' },
                    ] as const
                  ).map((st) => (
                    <button
                      type="button"
                      key={st.key}
                      onClick={() => setEditStatus(st.key)}
                      className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                        editStatus === st.key
                          ? 'border-[#0A3B34] bg-[#D1F2E7]/40 ring-1 ring-[#0A3B34]'
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <span className="font-bold text-gray-800 block text-xs">{st.label}</span>
                      <span className="text-[10px] text-gray-400 block">{st.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={handleSaveEditEmployee}
                disabled={isSavingEmployee}
                className="flex-1 bg-[#F25238] hover:bg-[#d84229] disabled:opacity-50 text-white font-bold py-2.5 rounded-full text-xs shadow-sm transition cursor-pointer"
              >
                {isSavingEmployee ? 'Saving Changes...' : 'Save Employee Changes'}
              </button>
              <button
                type="button"
                onClick={() => setEditingEmployee(null)}
                className="px-5 border border-gray-200 text-gray-600 hover:bg-gray-100 font-semibold py-2.5 rounded-full text-xs transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD NEW EMPLOYEE MODAL */}
      {showAddEmployeeModal && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="font-bold text-lg text-gray-900">Add New Team Member</h3>
              <button
                onClick={() => setShowAddEmployeeModal(false)}
                className="text-gray-400 hover:text-black font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={newEmpName}
                  onChange={(e) => setNewEmpName(e.target.value)}
                  placeholder="e.g. Jordan Hayes"
                  className="w-full p-2.5 rounded-xl border border-gray-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Role / Title *</label>
                <input
                  type="text"
                  value={newEmpRole}
                  onChange={(e) => setNewEmpRole(e.target.value)}
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full p-2.5 rounded-xl border border-gray-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Department</label>
                  <select
                    value={newEmpDept}
                    onChange={(e) => setNewEmpDept(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 bg-white"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Management">Management</option>
                    <option value="General Operations">Operations</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Monthly Salary ($)</label>
                  <input
                    type="number"
                    value={newEmpSalary}
                    onChange={(e) => setNewEmpSalary(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-gray-200 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Status</label>
                  <select
                    value={newEmpStatus}
                    onChange={(e) => setNewEmpStatus(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 bg-white"
                  >
                    <option value="active">Active</option>
                    <option value="onboarding">Onboarding</option>
                    <option value="leave">On Leave</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Type</label>
                  <select
                    value={newEmpType}
                    onChange={(e) => setNewEmpType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 bg-white"
                  >
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                    <option value="contractor">Contractor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newEmpEmail}
                  onChange={(e) => setNewEmpEmail(e.target.value)}
                  placeholder="jordan.h@acmecompany.com"
                  className="w-full p-2.5 rounded-xl border border-gray-200"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={handleCreateNewEmployee}
                disabled={!newEmpName.trim()}
                className="flex-1 bg-[#0A3B34] hover:bg-[#072A25] disabled:opacity-50 text-white font-bold py-2.5 rounded-full text-xs cursor-pointer"
              >
                Add Employee to Team
              </button>
              <button
                type="button"
                onClick={() => setShowAddEmployeeModal(false)}
                className="px-4 border border-gray-200 text-gray-600 rounded-full text-xs font-semibold hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
