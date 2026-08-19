'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MAX_RESUME_BYTES = 5 * 1024 * 1024 // 5MB
const ALLOWED_RESUME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

interface Job {
  id: string
  title: string
  location: string
  department: string
  role: string
  requirements: string
}

const JOBS: Job[] = [
  {
    id: 'site-engineer',
    title: 'Site Engineer — Villa Construction',
    location: 'Kannur / Ernakulam',
    department: 'Construction',
    role: 'Oversee day-to-day villa construction activities at our active project sites. Ensure quality standards, material compliance and timeline adherence. Coordinate with the in-house construction team and report to the Project Manager.',
    requirements: 'B.Tech / Diploma in Civil Engineering. 2+ years experience in residential construction. Working knowledge of Vastu compliance and Kerala building regulations preferred.'
  },
  {
    id: 'sales-executive',
    title: 'Sales Executive — Villa Projects',
    location: 'Kannur',
    department: 'Sales & Marketing',
    role: 'Handle inbound enquiries from prospective villa buyers, conduct site visits, manage follow-ups and support buyers through the documentation process. NRI buyer experience is a strong advantage.',
    requirements: 'Degree in any discipline. Strong communication skills in Malayalam and English. Prior experience in real estate sales preferred. WhatsApp / digital communication fluency essential.'
  },
  {
    id: 'customer-relations',
    title: 'Customer Relations Executive',
    location: 'Kannur',
    department: 'Customer Relations',
    role: 'Manage post-sale relationships with CMR villa owners. Coordinate handovers, handle service requests, maintain buyer communication and ensure the CMR post-sale promise is delivered.',
    requirements: 'Degree in Business or related field. Strong interpersonal skills. Malayalam and English fluency. Experience in customer service or real estate preferred.'
  },
  {
    id: 'design-assistant',
    title: 'Design Assistant / AutoCAD Draughtsperson',
    location: 'Kannur',
    department: 'Architectural Design',
    role: 'Support our architectural team in preparing villa floor plans, elevations and working drawings. Assist in Vastu-compliant layout planning and coordination with site teams.',
    requirements: 'Diploma or Degree in Architecture / Civil Engineering. Proficiency in AutoCAD. Knowledge of Kerala building regulations. Vastu training an advantage.'
  }
]

export default function CareersClient({ initialJobs }: { initialJobs?: Job[] }) {
  const jobs = initialJobs && initialJobs.length > 0 ? initialJobs : JOBS
  const [expandedJob, setExpandedJob] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    if (!file) {
      setResumeFile(null)
      return
    }
    if (file.size > MAX_RESUME_BYTES) {
      setError('CV file is too large. Please keep it under 5MB.')
      e.target.value = ''
      setResumeFile(null)
      return
    }
    if (!ALLOWED_RESUME_TYPES.has(file.type)) {
      setError('CV must be a PDF or Word document (.pdf, .doc, .docx).')
      e.target.value = ''
      setResumeFile(null)
      return
    }
    setError(null)
    setResumeFile(file)
  }

  const toggleJob = (id: string) => {
    setExpandedJob(expandedJob === id ? null : id)
  }

  const handleApplyNow = (jobTitle: string) => {
    setSelectedRole(jobTitle)
    const element = document.getElementById('application-form')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!resumeFile) {
      setError('Please attach your CV.')
      return
    }

    setIsSubmitting(true)

    try {
      const payload = new FormData()
      payload.append('position', selectedRole)
      payload.append('name', formData.name)
      payload.append('phone', formData.phone)
      payload.append('email', formData.email)
      payload.append('message', formData.message)
      payload.append('resume', resumeFile)

      const res = await fetch('/api/careers', {
        method: 'POST',
        body: payload,
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Something went wrong. Please try again.')
      }

      setIsSuccess(true)
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
      })
      setResumeFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
      setSelectedRole('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-20">
      {/* ── Open Positions ──────────────────────────────── */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center mb-12">
            <span className="font-body text-brand-gold text-[11px] font-bold tracking-[0.25em] uppercase mb-3 block">
              Join Our Team
            </span>
            <h2 className="font-display font-bold text-brand-charcoal text-3xl md:text-4xl">
              Current Open Opportunities
            </h2>
            <p className="font-body text-brand-charcoal/60 text-[15px] mt-3 max-w-xl mx-auto font-light">
              Select an open role below to view responsibilities and requirements, and apply directly.
            </p>
          </div>

          <div className="border border-brand-gray/20 rounded-2xl overflow-hidden shadow-sm">
            {jobs.map((job) => {
              const isExpanded = expandedJob === job.id
              return (
                <div 
                  key={job.id} 
                  className={`border-b border-brand-gray/20 last:border-b-0 transition-colors ${
                    isExpanded ? 'bg-brand-ivory/10' : 'hover:bg-brand-ivory/5'
                  }`}
                >
                  {/* Header */}
                  <button
                    onClick={() => toggleJob(job.id)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                  >
                    <div className="space-y-1 pr-4">
                      <span className="inline-block px-2.5 py-0.5 bg-brand-green/5 text-brand-green font-body text-[10px] font-semibold tracking-wider uppercase rounded-full">
                        {job.department}
                      </span>
                      <h3 className="font-display font-bold text-brand-charcoal text-lg md:text-xl group-hover:text-brand-green transition-colors">
                        {job.title}
                      </h3>
                      <p className="font-body text-brand-charcoal/50 text-[13px] flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        {job.location}
                      </p>
                    </div>
                    <span className="flex-shrink-0 w-8 h-8 rounded-full border border-brand-gray/30 flex items-center justify-center text-brand-charcoal/40 group-hover:text-brand-green group-hover:border-brand-green transition-colors">
                      <motion.svg 
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        className="w-4 h-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </span>
                  </button>

                  {/* Body */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 border-t border-brand-gray/10 space-y-6 text-sm">
                          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-8 pt-4">
                            <div className="font-display font-semibold text-brand-charcoal uppercase text-xs tracking-widest text-brand-gold">
                              The Role
                            </div>
                            <div className="font-body text-brand-charcoal/70 leading-relaxed font-light">
                              {job.role}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-8 pt-4 border-t border-brand-gray/10">
                            <div className="font-display font-semibold text-brand-charcoal uppercase text-xs tracking-widest text-brand-gold">
                              Requirements
                            </div>
                            <div className="font-body text-brand-charcoal/70 leading-relaxed font-light">
                              {job.requirements}
                            </div>
                          </div>

                          <div className="flex justify-end pt-4 border-t border-brand-gray/10">
                            <button
                              onClick={() => handleApplyNow(job.title)}
                              className="px-6 py-2.5 bg-brand-green text-brand-ivory hover:bg-brand-gold text-[11px] font-bold tracking-widest uppercase transition-all duration-300 rounded"
                            >
                              Apply For This Position
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Application Form ────────────────────────────── */}
      <section id="application-form" className="bg-[#fcfbf9] py-16 border-t border-brand-gray/20">
        <div className="max-w-2xl mx-auto px-4 md:px-0">
          <div className="bg-white p-8 md:p-10 border border-brand-gray/20 rounded-2xl shadow-sm">
            <div className="text-center mb-8">
              <h3 className="font-display font-bold text-brand-charcoal text-2xl">
                Submit Your Application
              </h3>
              <p className="font-body text-brand-charcoal/50 text-[14px] mt-1 font-light">
                Fill in the details below and attach your CV. We will get back to you soon.
              </p>
            </div>

            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-brand-green/5 border border-brand-green/20 rounded-xl p-8 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <h4 className="font-display font-bold text-brand-charcoal text-lg">Application Submitted Successfully</h4>
                <p className="font-body text-brand-charcoal/60 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for applying. Our HR team has received your details and will contact you via email or WhatsApp if your profile matches our requirements.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-2 text-brand-green hover:text-brand-gold text-xs font-bold tracking-widest uppercase transition-colors"
                >
                  Submit Another Application
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="block font-body text-[11px] font-bold text-brand-charcoal uppercase tracking-wider">
                    Position *
                  </label>
                  <select
                    required
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full bg-brand-ivory/10 border border-brand-gray/30 rounded-lg px-4 py-3 text-brand-charcoal text-sm outline-none focus:border-brand-green transition-colors font-body"
                  >
                    <option value="" disabled>Select a position to apply</option>
                    {jobs.map((j) => (
                      <option key={j.id} value={j.title}>{j.title}</option>
                    ))}
                    <option value="General Application">General Application (Other)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="block font-body text-[11px] font-bold text-brand-charcoal uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full bg-brand-ivory/10 border border-brand-gray/30 rounded-lg px-4 py-3 text-brand-charcoal text-sm outline-none focus:border-brand-green transition-colors font-body"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block font-body text-[11px] font-bold text-brand-charcoal uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-brand-ivory/10 border border-brand-gray/30 rounded-lg px-4 py-3 text-brand-charcoal text-sm outline-none focus:border-brand-green transition-colors font-body"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block font-body text-[11px] font-bold text-brand-charcoal uppercase tracking-wider">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. john@example.com"
                    className="w-full bg-brand-ivory/10 border border-brand-gray/30 rounded-lg px-4 py-3 text-brand-charcoal text-sm outline-none focus:border-brand-green transition-colors font-body"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-body text-[11px] font-bold text-brand-charcoal uppercase tracking-wider">
                    Upload CV *
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    required
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleResumeChange}
                    className="w-full bg-brand-ivory/10 border border-brand-gray/30 rounded-lg px-4 py-3 text-brand-charcoal text-sm outline-none focus:border-brand-green transition-colors font-body file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-[11px] file:font-bold file:uppercase file:tracking-wider file:bg-brand-green file:text-brand-ivory hover:file:bg-brand-gold file:cursor-pointer cursor-pointer"
                  />
                  <span className="block text-[11px] text-brand-charcoal/40 font-light mt-1">
                    {resumeFile ? `Selected: ${resumeFile.name}` : 'PDF or Word document, up to 5MB.'}
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="block font-body text-[11px] font-bold text-brand-charcoal uppercase tracking-wider">
                    Cover Message / Additional Details
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your experience, certifications, or why you want to join CMR..."
                    className="w-full bg-brand-ivory/10 border border-brand-gray/30 rounded-lg px-4 py-3 text-brand-charcoal text-sm outline-none focus:border-brand-green transition-colors font-body resize-none"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600 font-body bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-brand-green text-brand-ivory hover:bg-brand-gold font-body text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-lg shadow-md shadow-brand-green/5 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-brand-ivory" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
