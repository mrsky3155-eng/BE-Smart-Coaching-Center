import React, { useState } from 'react';
import { X, Check, Award, Printer, ArrowRight, ShieldCheck } from 'lucide-react';
import { COURSES, INSTITUTION_INFO } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { InstituteLogo } from './InstituteLogo';
import { AdmissionApplication } from '../types';

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCourseId?: string;
  preappliedScholarshipPct?: number;
}

export const AdmissionModal: React.FC<AdmissionModalProps> = ({
  isOpen,
  onClose,
  preselectedCourseId = 'course-school',
  preappliedScholarshipPct = 0,
}) => {
  const { user, submitAdmission } = useAuth();

  const [studentName, setStudentName] = useState(user?.name || '');
  const [guardianName, setGuardianName] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [courseId, setCourseId] = useState(preselectedCourseId);
  const [previousSchool, setPreviousSchool] = useState('');
  const [gpaOrScore, setGpaOrScore] = useState('3.80 GPA');
  const [shiftPreference, setShiftPreference] = useState('Morning (6:30 AM)');
  const [address, setAddress] = useState('Janakpur-04, Dhanusha');
  const [scholarshipPct, setScholarshipPct] = useState(preappliedScholarshipPct);

  const [submittedApp, setSubmittedApp] = useState<AdmissionApplication | null>(null);

  if (!isOpen) return null;

  const selectedCourse = COURSES.find((c) => c.id === courseId) || COURSES[0];
  const originalFee = selectedCourse.feeNPR;
  const discountAmount = Math.round((originalFee * scholarshipPct) / 100);
  const netFee = originalFee - discountAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !email || !phone) return;

    const newApp = submitAdmission({
      studentName,
      guardianName: guardianName || 'Guardian',
      email,
      phone,
      courseId,
      courseTitle: selectedCourse.title,
      previousSchool: previousSchool || 'Secondary School, Janakpur',
      gpaOrScore,
      shiftPreference,
      address,
      scholarshipEligiblePercent: scholarshipPct,
    });

    setSubmittedApp(newApp);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <InstituteLogo size={32} />
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-tight">
                Online Admission & Scholarship Portal
              </h2>
              <p className="text-[11px] text-slate-500">
                Session 2082/2083 · Be Smart Coaching Center
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedApp ? (
          /* Confirmation & Official Admission Slip */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start gap-3">
              <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm text-emerald-950">
                  Admission Inquiry Successfully Registered!
                </p>
                <p className="mt-0.5 text-emerald-700">
                  Your reference application code has been generated. Please save or print this acknowledgment receipt to present at our front desk in Janakpur-04.
                </p>
              </div>
            </div>

            {/* Printable Slip Container */}
            <div className="border border-slate-300 rounded-xl p-6 bg-slate-50/50 space-y-4 text-xs font-sans">
              <div className="flex items-start justify-between border-b border-slate-300 pb-4">
                <div>
                  <h3 className="font-extrabold text-slate-900 uppercase tracking-tight text-sm">
                    {INSTITUTION_INFO.name}
                  </h3>
                  <p className="text-slate-600">{INSTITUTION_INFO.address}</p>
                  <p className="text-slate-500 text-[11px]">
                    Govt. Reg: {INSTITUTION_INFO.registrationNo} · Ph: {INSTITUTION_INFO.phone}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-sky-800 text-sm">
                    {submittedApp.id}
                  </p>
                  <p className="text-[11px] text-slate-500">Date: {submittedApp.appliedDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-slate-700">
                <div>
                  <span className="text-slate-500">Applicant:</span>{' '}
                  <strong className="text-slate-900">{submittedApp.studentName}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Guardian:</span> {submittedApp.guardianName}
                </div>
                <div>
                  <span className="text-slate-500">Phone:</span> {submittedApp.phone}
                </div>
                <div>
                  <span className="text-slate-500">Email:</span> {submittedApp.email}
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500">Enrolled Program:</span>{' '}
                  <span className="font-semibold text-slate-900">{submittedApp.courseTitle}</span>
                </div>
                <div>
                  <span className="text-slate-500">Selected Shift:</span> {submittedApp.shiftPreference}
                </div>
                <div>
                  <span className="text-slate-500">Academic Score:</span> {submittedApp.gpaOrScore}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-300 flex justify-between items-center bg-white p-3 rounded-lg border">
                <div>
                  <p className="text-[11px] text-slate-500">Tuition Fee Assessment</p>
                  {scholarshipPct > 0 ? (
                    <p className="text-emerald-700 font-semibold text-xs">
                      {scholarshipPct}% Scholarship Applied
                    </p>
                  ) : null}
                </div>
                <div className="text-right">
                  <p className="text-base font-extrabold font-mono text-slate-900">
                    NPR {netFee.toLocaleString()}
                  </p>
                  {scholarshipPct > 0 && (
                    <p className="text-[11px] text-slate-400 line-through font-mono">
                      NPR {originalFee.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print Acknowledgment Slip
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Application Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar Yadav"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Guardian / Father's Name *
                </label>
                <input
                  type="text"
                  required
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  placeholder="e.g. Ram Narayan Yadav"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="applicant@gmail.com"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Contact Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98XXXXXXXX"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600"
                />
              </div>
            </div>

            {/* Course & Shift */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Select Program *
                </label>
                <select
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600 bg-white"
                >
                  {COURSES.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}{course.feeNPR > 0 ? ` (NPR ${course.feeNPR.toLocaleString()})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Shift Preference *
                </label>
                <select
                  value={shiftPreference}
                  onChange={(e) => setShiftPreference(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600 bg-white"
                >
                  <option value="Morning (6:30 AM)">Morning Shift (6:30 AM – 10:30 AM)</option>
                  <option value="Day (11:00 AM)">Day Shift (11:00 AM – 2:30 PM)</option>
                  <option value="Evening (3:30 PM)">Evening Shift (3:30 PM – 7:30 PM)</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Previous School / College
                </label>
                <input
                  type="text"
                  value={previousSchool}
                  onChange={(e) => setPreviousSchool(e.target.value)}
                  placeholder="e.g. Model Higher Secondary School"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Previous Academic GPA / Percentage
                </label>
                <input
                  type="text"
                  value={gpaOrScore}
                  onChange={(e) => setGpaOrScore(e.target.value)}
                  placeholder="e.g. 3.85 GPA or 82%"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Residential Address in Janakpur / Dhanusha
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ward No., Tole, Janakpurdham"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600"
              />
            </div>

            {/* Scholarship calculation box */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800">
                  Applicable Merit / Diagnostic Scholarship:
                </span>
                <select
                  value={scholarshipPct}
                  onChange={(e) => setScholarshipPct(Number(e.target.value))}
                  className="px-2 py-1 bg-white border border-slate-300 rounded text-xs font-semibold text-sky-700"
                >
                  <option value={0}>Standard Fee (0%)</option>
                  <option value={15}>Foundation Waiver (15%)</option>
                  <option value={30}>Merit Score Waiver (30%)</option>
                  <option value={50}>Diagnostic Top Tier Waiver (50%)</option>
                </select>
              </div>

              <div className="flex items-center justify-between text-slate-600 pt-2 border-t border-slate-200 text-xs">
                <span>Tuition Base Fee:</span>
                <span className="font-mono">NPR {originalFee.toLocaleString()}</span>
              </div>
              {scholarshipPct > 0 && (
                <div className="flex items-center justify-between text-emerald-700 text-xs font-medium">
                  <span>Scholarship Discount ({scholarshipPct}%):</span>
                  <span className="font-mono">- NPR {discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-slate-900 font-bold text-sm pt-1 border-t border-slate-200">
                <span>Net Payable Fee:</span>
                <span className="font-mono text-base text-sky-800">
                  NPR {netFee.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold flex items-center gap-2 transition-colors"
              >
                Submit Admission Inquiry
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
