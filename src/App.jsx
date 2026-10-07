import React, { useState, useEffect, useRef } from 'react'
import { INITIAL_USERS, INITIAL_TOOLS, CATEGORIES } from './data.js'
import { 
  Wrench, 
  Search, 
  MapPin, 
  Star, 
  Plus, 
  Calendar, 
  User, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  MessageSquare, 
  Trash2, 
  Edit3, 
  SlidersHorizontal,
  ChevronRight,
  Sun,
  Moon,
  LogOut,
  Sparkles,
  Phone,
  Send,
  Upload,
  Info,
  Map,
  Grid,
  Bell,
  ShieldCheck,
  QrCode,
  FileText,
  Lock,
  Bot,
  Zap,
  TrendingUp,
  Leaf,
  DollarSign,
  ShieldAlert,
  Lightbulb,
  Check,
  Hammer,
  Printer,
  Scale,
  CheckSquare,
  FileCheck,
  Award
} from 'lucide-react'

// Initial Seed Data
// INITIAL_USERS, INITIAL_TOOLS, CATEGORIES imported from ./data.js

// Tools imported from ./data.js

const INITIAL_BOOKINGS = [
  {
    id: 'b1',
    toolId: 't3',
    renterId: '1',
    lenderId: '2',
    startDate: '2026-07-20',
    endDate: '2026-07-22',
    totalPrice: 5400,
    depositPrice: 5000,
    discountAmount: 0,
    status: 'approved',
    renterReviewed: false,
    lenderReviewed: false,
    logs: [
      { action: 'Request Created', time: '2026-07-18 10:20 AM' },
      { action: 'Deposit Authorized', time: '2026-07-18 10:22 AM' },
      { action: 'Approved by Owner', time: '2026-07-18 02:40 PM' }
    ]
  },
  {
    id: 'b2',
    toolId: 't2',
    renterId: '2',
    lenderId: '3',
    startDate: '2026-07-15',
    endDate: '2026-07-17',
    totalPrice: 2400,
    depositPrice: 3000,
    discountAmount: 0,
    status: 'returned',
    renterReviewed: true,
    lenderReviewed: true,
    renterReview: { rating: 5, comment: 'Excellent trimmer, cut through lawn grass like butter! Very friendly lender.' },
    lenderReview: { rating: 4, comment: 'Nimal was punctual, returned the tool clean and on time.' },
    logs: [
      { action: 'Request Created', time: '2026-07-14 08:00 AM' },
      { action: 'Approved by Owner', time: '2026-07-14 09:15 AM' },
      { action: 'Handed Over (QR Verified)', time: '2026-07-15 09:30 AM' },
      { action: 'Returned & Refund Released', time: '2026-07-17 05:00 PM' }
    ]
  }
]

const INITIAL_CHATS = [
  {
    id: 'c1',
    renterId: '1',
    lenderId: '2',
    toolId: 't3',
    messages: [
      { id: 'm1', senderId: '1', text: 'Hi Nimal, is the pressure washer available for rent next Monday?', timestamp: 'Yesterday' },
      { id: 'm2', senderId: '2', text: 'Hi Kasun! Yes, it is fully available. Feel free to send a booking request.', timestamp: 'Yesterday' }
    ]
  }
]

// CATEGORIES imported from ./data.js

const PRESET_PROJECTS = [
  {
    id: 'p1',
    title: 'Bathroom & Wall Tile Renovation',
    category: 'Power Tools',
    description: 'Demolish old tiles & concrete efficiently without heavy manual labor.',
    recommendedToolIds: ['t1'],
    durationDays: 2,
    contractorCost: 45000,
    steps: [
      'Put on safety goggles, heavy duty gloves, and ear defenders.',
      'Mount the Demolition Jackhammer with flat chisel attachment at a 45-degree angle.',
      'Chop mortar in steady downward strokes to prevent wall brick damage.',
      'Clear concrete rubble before laying thinset mortar for new tiles.'
    ],
    safetyGear: ['Safety Goggles', 'Heavy Duty Gloves', 'Ear Defenders', 'Dust Mask']
  },
  {
    id: 'p2',
    title: 'Backyard Lawn & Hedge Spring Cleaning',
    category: 'Gardening',
    description: 'Trim overgrown lawns, weeds, and edge garden beds smoothly.',
    recommendedToolIds: ['t2'],
    durationDays: 1,
    contractorCost: 15000,
    steps: [
      'Inspect lawn area and clear hidden stones or debris.',
      'Ensure 2-stroke fuel tank is filled to optimal level.',
      'Operate trimmer in smooth sweeping arcs from right to left.',
      'Collect green trimmings for organic composting.'
    ],
    safetyGear: ['Eye Protection', 'Non-slip Work Boots', 'Long Work Pants']
  },
  {
    id: 'p3',
    title: 'Exterior Wall & Driveway Deep Wash',
    category: 'Cleaning',
    description: 'Blast away moss, algae, mud, and oil stains with high pressure wash.',
    recommendedToolIds: ['t3'],
    durationDays: 1,
    contractorCost: 22000,
    steps: [
      'Connect pressure washer inlet hose securely to tap water source.',
      'Apply detergent via spray nozzle to loosen oil and dirt spots.',
      'Wash at a 15-inch distance using 140 Bar pressure nozzle.',
      'Rinse down from top surfaces to ground level.'
    ],
    safetyGear: ['Waterproof Boots', 'Eye Safety Goggles', 'Rubber Grip Gloves']
  },
  {
    id: 'p4',
    title: 'High Roof & Ceiling Maintenance',
    category: 'Ladders',
    description: 'Reach high roof gutters, paint high walls, and repair overhead ceilings.',
    recommendedToolIds: ['t4'],
    durationDays: 2,
    contractorCost: 28000,
    steps: [
      'Set aluminum folding ladder on level, dry ground with rubber feet engaged.',
      'Check ladder hinge locks before climbing.',
      'Always maintain 3 points of contact when ascending or descending.',
      'Reposition ladder as needed rather than overreaching.'
    ],
    safetyGear: ['Rigid Work Boots', 'Safety Harness (for roof access)', 'Work Gloves']
  }
]

const PROTECTION_PLANS = [
  {
    id: 'standard',
    name: 'Standard Security Deposit',
    feePerDay: 0,
    badge: 'FREE',
    description: 'Standard security deposit held during rental and refunded upon return.'
  },
  {
    id: 'smart',
    name: 'Smart Shield Protection',
    feePerDay: 250,
    badge: 'POPULAR',
    description: 'Covers 90% of accidental minor wear and tear damage during work.'
  },
  {
    id: 'premium',
    name: 'All-Risk Peace of Mind',
    feePerDay: 450,
    badge: 'GUARANTEED',
    description: '100% full tool protection with zero liability and instant deposit unlock.'
  }
]

function App() {
  // Auth States
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('currentUserId'))
  const [authView, setAuthView] = useState('login') // 'login' | 'register'
  const [authForm, setAuthForm] = useState({ name: '', email: '', phone: '', password: '', location: 'Colombo 05', nic: '' })
  const [authError, setAuthError] = useState('')

  // Persistence States
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (!saved || saved === 'dark') {
      localStorage.setItem('theme', 'light')
      return 'light'
    }
    return saved
  })
  const [users, setUsers] = useState(() => {
    const stored = JSON.parse(localStorage.getItem('users') || 'null')
    if (stored && stored[0]?.id && !stored[0].id.startsWith('u') && !stored[0].id.startsWith('admin')) {
      localStorage.removeItem('users')
      localStorage.removeItem('currentUserId')
      localStorage.removeItem('tools')
      localStorage.removeItem('bookings')
      localStorage.removeItem('chats')
      return INITIAL_USERS
    }
    // Force reload to pick up admin user if not there
    if (stored && !stored.find(u => u.role === 'admin')) {
        localStorage.removeItem('users')
        return INITIAL_USERS
    }
    return stored || INITIAL_USERS
  })
  const [currentUserId, setCurrentUserId] = useState(() => localStorage.getItem('currentUserId') || 'u1')
  const [tools, setTools] = useState(() => {
    const stored = JSON.parse(localStorage.getItem('tools') || 'null')
    if (stored && stored[0]?.ownerId && !stored[0].ownerId.startsWith('u')) return INITIAL_TOOLS
    return stored || INITIAL_TOOLS
  })
  const [bookings, setBookings] = useState(() => JSON.parse(localStorage.getItem('bookings')) || INITIAL_BOOKINGS)
  const [chats, setChats] = useState(() => JSON.parse(localStorage.getItem('chats')) || INITIAL_CHATS)
  
  // Layout Options
  const [currentView, setCurrentView] = useState('explore')
  const [exploreViewStyle, setExploreViewStyle] = useState('grid')
  const [dashTab, setDashTab] = useState('renting')
  
  // Search & Filtering States
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState('All')

  // AI Thinking Advisor States
  const [aiProjectQuery, setAiProjectQuery] = useState('')
  const [selectedPresetProject, setSelectedPresetProject] = useState(null)
  const [aiThinking, setAiThinking] = useState(false)
  const [aiThinkingStep, setAiThinkingStep] = useState(1)
  const [aiResult, setAiResult] = useState(null)
  const [selectedProtectionPlan, setSelectedProtectionPlan] = useState('standard')

  // NEW FEATURE STATES
  const [compareToolIds, setCompareToolIds] = useState([])
  const [isCompareOpen, setIsCompareOpen] = useState(false)
  const [invoiceBooking, setInvoiceBooking] = useState(null)

  // Gemini AI API States
  const [geminiApiKey, setGeminiApiKey] = useState(() => localStorage.getItem('geminiApiKey') || '')
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false)
  const [apiKeyInput, setApiKeyInput] = useState('')

  // AI Tool Advisor Bot States
  const [isBotOpen, setIsBotOpen] = useState(false)
  const [botMessages, setBotMessages] = useState([
    { role: 'bot', text: '👋 Hi! I am your AI Tool Advisor powered by Gemini. Tell me your DIY project or ask me which tool you need — I will find the best match from the marketplace!' }
  ])
  const [botInput, setBotInput] = useState('')
  const [botThinking, setBotThinking] = useState(false)
  const botEndRef = useRef(null)
  
  // Toast Notifications
  const [toasts, setToasts] = useState([])
  
  // Modals & QR Scan simulations
  const [selectedTool, setSelectedTool] = useState(null)
  const [isAddToolOpen, setIsAddToolOpen] = useState(false)
  const [isReviewOpen, setIsReviewOpen] = useState(false)
  const [reviewBooking, setReviewBooking] = useState(null)
  const [reviewTarget, setReviewTarget] = useState('tool')
  const [editTool, setEditTool] = useState(null)
  const [qrScanBooking, setQrScanBooking] = useState(null)
  const [qrScanType, setQrScanType] = useState('pickup')
  const [isScanningStatus, setIsScanningStatus] = useState('idle')

  // Active Chat states
  const [activeChatId, setActiveChatId] = useState('')
  const [chatMessageText, setChatMessageText] = useState('')

  // Upload simulation states
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedImagePreset, setUploadedImagePreset] = useState('')

  // Form Fields
  const [bookingStart, setBookingStart] = useState('')
  const [bookingEnd, setBookingEnd] = useState('')
  const [newToolForm, setNewToolForm] = useState({
    title: '',
    category: 'Power Tools',
    description: '',
    rate: '',
    deposit: '',
    location: '',
    iconPreset: 'drill'
  })
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: ''
  })
  const [profileForm, setProfileForm] = useState({
    name: '',
    phone: '',
    location: '',
    nic: ''
  })

  const chatEndRef = useRef(null)
  const currentUser = users.find(u => u.id === currentUserId) || users[0]

  // Persist Gemini API key
  useEffect(() => { localStorage.setItem('geminiApiKey', geminiApiKey) }, [geminiApiKey])

  // Scroll bot to bottom
  useEffect(() => { botEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [botMessages])

  // Persists
  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.className = theme === 'dark' ? 'dark-theme' : 'light-theme'
  }, [theme])

  useEffect(() => { localStorage.setItem('users', JSON.stringify(users)) }, [users])
  useEffect(() => { localStorage.setItem('currentUserId', currentUserId) }, [currentUserId])
  useEffect(() => { localStorage.setItem('tools', JSON.stringify(tools)) }, [tools])
  useEffect(() => { localStorage.setItem('bookings', JSON.stringify(bookings)) }, [bookings])
  useEffect(() => { localStorage.setItem('chats', JSON.stringify(chats)) }, [chats])

  // Reset profile form
  useEffect(() => {
    if (currentUser) {
      setProfileForm({
        name: currentUser.name,
        phone: currentUser.phone,
        location: currentUser.location,
        nic: currentUser.nic || ''
      })
    }
  }, [currentUserId, users])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeChatId, chats])

  const showToast = (message, type = 'info') => {
    const id = 'toast_' + Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const locations = ['All', ...new Set(tools.map(t => t.location))]

  const isDateOverlapping = (toolId, start, end, excludeBookingId = null) => {
    if (!start || !end) return false
    const checkStart = new Date(start)
    const checkEnd = new Date(end)

    return bookings.some(b => {
      if (b.toolId !== toolId) return false
      if (b.id === excludeBookingId) return false
      if (b.status === 'declined' || b.status === 'returned') return false

      const bStart = new Date(b.startDate)
      const bEnd = new Date(b.endDate)
      return checkStart <= bEnd && checkEnd >= bStart
    })
  }

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory
    const matchesLocation = selectedLocation === 'All' || tool.location === selectedLocation
    const isNotOwnTool = tool.ownerId !== currentUserId
    return matchesSearch && matchesCategory && matchesLocation && isNotOwnTool
  })

  const calculateTotalDays = (start, end) => {
    if (!start || !end) return 0
    const sDate = new Date(start)
    const eDate = new Date(end)
    const diffTime = Math.abs(eDate - sDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    return diffDays > 0 ? diffDays : 0
  }

  // Multi-day Discount Logic: 3-4 days = 10% OFF, 5+ days = 20% OFF
  const getMultiDayDiscountPct = (days) => {
    if (days >= 5) return 20
    if (days >= 3) return 10
    return 0
  }

  // ── Gemini API Helper ────────────────────────────────────────────────────
  const callGeminiApi = async (prompt) => {
    if (!geminiApiKey) {
      throw new Error('NO_API_KEY')
    }
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`
    const body = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 1024 }
    }
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      throw new Error(errData?.error?.message || `HTTP ${res.status}`)
    }
    const data = await res.json()
    return data.candidates?.[0]?.content?.parts?.[0]?.text || ''
  }

  // Build tool inventory summary for Gemini context
  const buildToolsContext = () => {
    return tools.map(t =>
      `- ${t.title} (${t.category}): රු.${t.rate}/day, Deposit රු.${t.deposit}, Location: ${t.location}, Rating: ${t.rating}⭐, ID: ${t.id}`
    ).join('\n')
  }

  // AI Thinking Advisor Logic (Gemini powered with local fallback)
  const handleRunAiAdvisor = async (preset = null) => {
    const targetProject = preset || selectedPresetProject
    const query = targetProject ? targetProject.title : aiProjectQuery
    
    if (!query.trim() && !targetProject) {
      showToast('Please describe your DIY project or select a preset option!', 'warning')
      return
    }

    setAiThinking(true)
    setAiThinkingStep(1)
    setAiResult(null)

    // --- Preset project: use local data (no API needed) ---
    if (targetProject) {
      setTimeout(() => {
        setAiThinkingStep(2)
        setTimeout(() => {
          setAiThinkingStep(3)
          setTimeout(() => {
            setAiThinking(false)
            const matchingTools = tools.filter(t => targetProject.recommendedToolIds.includes(t.id))
            const rentalCost = matchingTools.reduce((acc, t) => acc + (t.rate * targetProject.durationDays), 0)
            const savings = Math.max(0, targetProject.contractorCost - rentalCost)
            setAiResult({
              query: targetProject.title,
              matchingTools,
              steps: targetProject.steps,
              durationDays: targetProject.durationDays,
              contractorCost: targetProject.contractorCost,
              rentalCost,
              savings,
              safetyGear: targetProject.safetyGear,
              aiSource: 'preset'
            })
            showToast('✅ Project plan loaded!', 'success')
          }, 600)
        }, 500)
      }, 500)
      return
    }

    // --- Free-text query: try Gemini API first ---
    if (geminiApiKey) {
      setAiThinkingStep(2)
      try {
        const toolsCtx = buildToolsContext()
        const prompt = `You are an expert DIY tool advisor for the Sri Lanka peer-to-peer rental platform "Rent-a-Tool LK".

Available tools in marketplace:
${toolsCtx}

User's project: "${query}"

Respond ONLY in this exact JSON format (no markdown, no extra text):
{
  "recommendedToolIds": ["t1"],
  "steps": ["Step 1 description", "Step 2", "Step 3", "Step 4"],
  "durationDays": 2,
  "contractorCost": 35000,
  "safetyGear": ["Safety Goggles", "Gloves"],
  "explanation": "Brief 1-sentence reason why these tools are best."
}`

        const raw = await callGeminiApi(prompt)
        // Strip markdown code fences if present
        const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
        const parsed = JSON.parse(cleaned)

        setAiThinkingStep(3)
        await new Promise(r => setTimeout(r, 600))

        const matchingTools = tools.filter(t => (parsed.recommendedToolIds || []).includes(t.id))
        if (matchingTools.length === 0) matchingTools.push(...tools.slice(0, 1))

        const duration = Math.max(1, parseInt(parsed.durationDays) || 2)
        const contractorCost = Math.max(10000, parseInt(parsed.contractorCost) || 35000)
        const rentalCost = matchingTools.reduce((acc, t) => acc + (t.rate * duration), 0)
        const savings = Math.max(0, contractorCost - rentalCost)

        setAiThinking(false)
        setAiResult({
          query,
          matchingTools,
          steps: parsed.steps || [],
          durationDays: duration,
          contractorCost,
          rentalCost,
          savings,
          safetyGear: parsed.safetyGear || ['Safety Goggles', 'Gloves'],
          explanation: parsed.explanation || '',
          aiSource: 'gemini'
        })
        showToast('🤖 Gemini AI Analysis Complete!', 'success')
        return
      } catch (err) {
        if (err.message === 'NO_API_KEY') {
          // fallthrough to local
        } else {
          showToast(`⚠️ Gemini API error: ${err.message}. Using local fallback.`, 'warning')
        }
      }
    } else {
      showToast('💡 Add your Gemini API key for real AI recommendations!', 'info')
    }

    // --- Local keyword fallback ---
    setAiThinkingStep(3)
    await new Promise(r => setTimeout(r, 600))
    setAiThinking(false)

    const safety = ['Safety Goggles', 'Heavy Duty Gloves', 'Sturdy Footwear']
    const q = query.toLowerCase()
    let matchingTools = tools.filter(t =>
      q.includes(t.category.toLowerCase()) ||
      q.includes(t.title.toLowerCase()) ||
      t.description.toLowerCase().split(' ').some(w => w.length > 3 && q.includes(w))
    )
    if (matchingTools.length === 0) matchingTools = [tools[0]]

    const duration = 2
    const contractorCost = 35000
    const rentalCost = matchingTools.reduce((acc, t) => acc + (t.rate * duration), 0)
    const savings = Math.max(0, contractorCost - rentalCost)

    const steps = [
      `Gather essential safety equipment (${safety.join(', ')}) before starting.`,
      `Inspect the ${matchingTools[0]?.title} and verify operating safety instructions with the owner.`,
      `Execute work systematically in focused 45-minute working intervals.`,
      `Clean tool surfaces thoroughly before returning to owner to release your deposit instantly.`
    ]

    setAiResult({
      query,
      matchingTools,
      steps,
      durationDays: duration,
      contractorCost,
      rentalCost,
      savings,
      safetyGear: safety,
      aiSource: 'local'
    })
    showToast('✅ Analysis complete (local mode — add API key for AI!)', 'success')
  }

  // ── AI Bot Chat Send ────────────────────────────────────────────────────
  const handleBotSend = async () => {
    const msg = botInput.trim()
    if (!msg) return
    setBotInput('')
    setBotMessages(prev => [...prev, { role: 'user', text: msg }])
    setBotThinking(true)

    try {
      if (!geminiApiKey) throw new Error('NO_API_KEY')
      const toolsCtx = buildToolsContext()
      const prompt = `You are a friendly, concise AI assistant for "Rent-a-Tool LK", a Sri Lanka tool rental marketplace.

Available tools:
${toolsCtx}

User asks: "${msg}"

Give a SHORT, helpful answer (2-4 sentences max). If they need a specific tool, name it and mention the daily rate. Respond in the same language the user used (Sinhala or English).`

      const reply = await callGeminiApi(prompt)
      setBotMessages(prev => [...prev, { role: 'bot', text: reply }])
    } catch (err) {
      if (err.message === 'NO_API_KEY') {
        setBotMessages(prev => [...prev, { role: 'bot', text: '🔑 Please add your Gemini API key first! Click the key icon (🔑) in the top right navbar to set it up.' }])
      } else {
        setBotMessages(prev => [...prev, { role: 'bot', text: `⚠️ Error: ${err.message}. Please check your API key and try again.` }])
      }
    } finally {
      setBotThinking(false)
    }
  }

  // AI Pricing Assistant for Lenders
  const handleAiPricingAssist = () => {
    const category = newToolForm.category || 'Power Tools'
    const title = newToolForm.title.toLowerCase()

    let rate = 2000
    let deposit = 5000

    if (title.includes('jackhammer') || title.includes('demolition') || title.includes('generator')) {
      rate = 3500
      deposit = 8000
    } else if (title.includes('trimmer') || title.includes('cutter') || title.includes('washer') || title.includes('cleaner')) {
      rate = 1800
      deposit = 4500
    } else if (title.includes('ladder') || title.includes('drill') || title.includes('sander')) {
      rate = 1200
      deposit = 3500
    } else if (category === 'Power Tools') {
      rate = 2500
      deposit = 6000
    } else if (category === 'Gardening') {
      rate = 1400
      deposit = 3500
    }

    setNewToolForm(prev => ({
      ...prev,
      rate: rate.toString(),
      deposit: deposit.toString()
    }))

    showToast(`🤖 AI Pricing applied! Suggested Rate: රු. ${rate.toLocaleString()}/day, Deposit: රු. ${deposit.toLocaleString()}`, 'success')
  }

  const handleCreateBooking = (e) => {
    e.preventDefault()
    if (isDateOverlapping(selectedTool.id, bookingStart, bookingEnd)) {
      alert('This tool is already booked for the selected dates.')
      return
    }

    const days = calculateTotalDays(bookingStart, bookingEnd)
    const baseRental = days * selectedTool.rate
    const discountPct = getMultiDayDiscountPct(days)
    const discountAmount = Math.round((baseRental * discountPct) / 100)
    const rentalFeeAfterDiscount = baseRental - discountAmount

    const planObj = PROTECTION_PLANS.find(p => p.id === selectedProtectionPlan) || PROTECTION_PLANS[0]
    const protectionFee = planObj.feePerDay * days
    const total = rentalFeeAfterDiscount + protectionFee

    const newBooking = {
      id: 'b_' + Date.now(),
      toolId: selectedTool.id,
      renterId: currentUserId,
      lenderId: selectedTool.ownerId,
      startDate: bookingStart,
      endDate: bookingEnd,
      totalPrice: total,
      depositPrice: selectedTool.deposit || 0,
      discountAmount: discountAmount,
      protectionPlan: planObj.name,
      status: 'pending',
      renterReviewed: false,
      lenderReviewed: false,
      logs: [
        { action: 'Request Created', time: new Date().toLocaleString() },
        { action: `Multi-day Discount: ${discountPct}% OFF (-රු. ${discountAmount.toLocaleString()})`, time: new Date().toLocaleString() },
        { action: `Protection Option Selected: ${planObj.name}`, time: new Date().toLocaleString() },
        { action: `Refundable Deposit Authorized (රු. ${(selectedTool.deposit || 0).toLocaleString()})`, time: new Date().toLocaleString() }
      ]
    }

    setBookings(prev => [newBooking, ...prev])
    setSelectedTool(null)
    setBookingStart('')
    setBookingEnd('')
    showToast('Booking request sent. Deposit Authorized!', 'success')
    setCurrentView('dashboard')
    setDashTab('renting')
  }

  const triggerImageUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadedImagePreset('drill')
          showToast('Image uploaded successfully to Cloudinary!', 'success')
          return 100
        }
        return prev + 10
      })
    }, 150)
  }

  const handleAddTool = (e) => {
    e.preventDefault()
    const rateNumber = parseFloat(newToolForm.rate)
    const depositNumber = parseFloat(newToolForm.deposit) || 0

    const newTool = {
      id: 't_' + Date.now(),
      title: newToolForm.title,
      category: newToolForm.category,
      ownerId: currentUserId,
      description: newToolForm.description,
      rate: rateNumber,
      deposit: depositNumber,
      location: newToolForm.location,
      mapX: Math.floor(Math.random() * 50) + 20,
      mapY: Math.floor(Math.random() * 50) + 20,
      availability: 'available',
      rating: 5.0,
      health: { motor: '100% Operational', cable: 'Inspected', bit: 'Cleaned', sanitized: 'Sanitized' },
      reviews: []
    }

    setTools(prev => [newTool, ...prev])
    setIsAddToolOpen(false)
    showToast(`New tool listed! Deposit set to රු. ${depositNumber.toLocaleString()}`, 'success')
  }

  const handleUpdateTool = (e) => {
    e.preventDefault()
    setTools(prev => prev.map(t => t.id === editTool.id ? {
      ...t,
      title: newToolForm.title,
      category: newToolForm.category,
      description: newToolForm.description,
      rate: parseFloat(newToolForm.rate),
      deposit: parseFloat(newToolForm.deposit) || 0,
      location: newToolForm.location
    } : t))
    setEditTool(null)
    setIsAddToolOpen(false)
    showToast('Tool details updated!', 'success')
  }

  const handleDeleteTool = (toolId) => {
    if (window.confirm('Delete this tool listing?')) {
      setTools(prev => prev.filter(t => t.id !== toolId))
      setBookings(prev => prev.filter(b => b.toolId !== toolId))
      showToast('Tool listing deleted.', 'warning')
    }
  }

  const toggleToolAvailability = (toolId, currentStatus) => {
    const nextStatus = currentStatus === 'available' ? 'unavailable' : 'available'
    setTools(prev => prev.map(t => t.id === toolId ? { ...t, availability: nextStatus } : t))
    showToast(`Availability changed to: ${nextStatus}`)
  }

  const updateBookingStatus = (bookingId, nextStatus, logMessage = '') => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        const actionLabel = logMessage || `Status changed to ${nextStatus}`
        return {
          ...b,
          status: nextStatus,
          logs: [...b.logs, { action: actionLabel, time: new Date().toLocaleString() }]
        }
      }
      return b
    }))
    showToast(`Status changed to: ${nextStatus}`)
  }

  const handleOpenReview = (booking, target) => {
    setReviewBooking(booking)
    setReviewTarget(target)
    setReviewForm({ rating: 5, comment: '' })
    setIsReviewOpen(true)
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    if (!reviewBooking) return

    if (reviewTarget === 'tool') {
      setTools(prev => prev.map(t => {
        if (t.id === reviewBooking.toolId) {
          const newReview = {
            id: 'r_' + Date.now(),
            author: currentUser.name,
            rating: reviewForm.rating,
            comment: reviewForm.comment
          }
          const updatedReviews = [...t.reviews, newReview]
          const avgRating = parseFloat((updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1))
          return {
            ...t,
            rating: avgRating,
            reviews: updatedReviews
          }
        }
        return t
      }))

      setBookings(prev => prev.map(b => b.id === reviewBooking.id ? { ...b, renterReviewed: true } : b))
      showToast('Thank you! Tool review submitted successfully.', 'success')
    } else {
      setUsers(prev => prev.map(u => {
        if (u.id === reviewBooking.renterId) {
          const newCount = u.reviewCount + 1
          const newRating = parseFloat(((u.rating * u.reviewCount + reviewForm.rating) / newCount).toFixed(1))
          return { ...u, rating: newRating, reviewCount: newCount }
        }
        return u
      }))

      setBookings(prev => prev.map(b => b.id === reviewBooking.id ? { ...b, lenderReviewed: true } : b))
      showToast('Renter feedback submitted!', 'success')
    }

    setIsReviewOpen(false)
    setReviewBooking(null)
  }

  const openQrScanner = (booking, scanType) => {
    setQrScanBooking(booking)
    setQrScanType(scanType)
    setIsScanningStatus('idle')
  }

  const simulateQrScan = () => {
    setIsScanningStatus('scanning')
    setTimeout(() => {
      setIsScanningStatus('success')
      setTimeout(() => {
        const nextStatus = qrScanType === 'pickup' ? 'active' : 'returned'
        const logMsg = qrScanType === 'pickup' 
          ? 'Handed Over (QR Code Verified)' 
          : 'Returned & Refundable Deposit Released'

        updateBookingStatus(qrScanBooking.id, nextStatus, logMsg)
        
        if (qrScanType === 'return') {
          setTools(prev => prev.map(t => t.id === qrScanBooking.toolId ? { ...t, availability: 'available' } : t))
        }

        setQrScanBooking(null)
      }, 1000)
    }, 1800)
  }

  const startChatWith = (ownerId, toolId) => {
    let chat = chats.find(c => 
      (c.renterId === currentUserId && c.lenderId === ownerId && c.toolId === toolId) ||
      (c.renterId === ownerId && c.lenderId === currentUserId && c.toolId === toolId)
    )

    if (!chat) {
      chat = {
        id: 'c_' + Date.now(),
        renterId: currentUserId,
        lenderId: ownerId,
        toolId: toolId,
        messages: []
      }
      setChats(prev => [chat, ...prev])
    }

    setActiveChatId(chat.id)
    setCurrentView('chat')
    setSelectedTool(null)
  }

  const sendChatMessage = (e) => {
    e.preventDefault()
    if (!chatMessageText.trim()) return

    const chat = chats.find(c => c.id === activeChatId)
    if (!chat) return

    const userMsg = {
      id: 'm_' + Date.now(),
      senderId: currentUserId,
      text: chatMessageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    const updatedChats = chats.map(c => {
      if (c.id === activeChatId) {
        return { ...c, messages: [...c.messages, userMsg] }
      }
      return c
    })
    setChats(updatedChats)
    
    const query = chatMessageText.toLowerCase()
    setChatMessageText('')

    setTimeout(() => {
      const recipient = users.find(u => u.id === (chat.renterId === currentUserId ? chat.lenderId : chat.renterId))
      const toolObj = tools.find(t => t.id === chat.toolId) || { title: 'tool' }
      
      let replyText = `Hi! I received your message regarding the ${toolObj.title}. `
      if (query.includes('price') || query.includes('discount') || query.includes('price?')) {
        replyText += `The rate is fixed at රු. ${toolObj.rate.toLocaleString()} per day, but rent for 3+ days and get 10% OFF!`
      } else if (query.includes('available') || query.includes('free')) {
        replyText += `Yes, the tool is currently available and clean. Go ahead and submit your booking request dates on the page so I can approve it.`
      } else if (query.includes('where') || query.includes('location') || query.includes('pickup')) {
        replyText += `You can pick it up from my location in ${toolObj.location}. I will send you the exact street details once you submit the booking!`
      } else {
        replyText += `Sounds good! Let me check the dates and get back to you soon. Let me know if you need any other details.`
      }

      const botMsg = {
        id: 'm_' + Date.now() + '_bot',
        senderId: recipient.id,
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }

      setChats(prev => prev.map(c => {
        if (c.id === activeChatId) {
          return { ...c, messages: [...c.messages, botMsg] }
        }
        return c
      }))

      showToast(`New message from ${recipient.name}`, 'info')
    }, 1500)
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault()
    setUsers(prev => prev.map(u => u.id === currentUserId ? {
      ...u,
      name: profileForm.name,
      phone: profileForm.phone,
      location: profileForm.location,
      nic: profileForm.nic,
      isVerified: profileForm.nic.length >= 10 ? true : false
    } : u))
    showToast('Profile updated!', 'success')
  }

  const handleEditToolClick = (tool) => {
    setEditTool(tool)
    setNewToolForm({
      title: tool.title,
      category: tool.category,
      description: tool.description,
      rate: tool.rate,
      deposit: tool.deposit || '',
      location: tool.location,
      iconPreset: tool.iconPreset || 'drill'
    })
    setIsAddToolOpen(true)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setAuthError('')
    const found = users.find(u =>
      (u.email === authForm.email || u.phone === authForm.email) &&
      u.password === authForm.password
    )
    if (!found) { setAuthError('Invalid email/phone or password. Please try again.'); return }
    setCurrentUserId(found.id)
    setIsLoggedIn(true)
    localStorage.setItem('currentUserId', found.id)
    showToast(`Welcome back, ${found.name}! 🎉`, 'success')
  }

  const handleRegister = (e) => {
    e.preventDefault()
    setAuthError('')
    if (!authForm.name || !authForm.email || !authForm.phone || !authForm.password) {
      setAuthError('Please fill in all required fields.'); return
    }
    if (users.find(u => u.email === authForm.email)) {
      setAuthError('An account with this email already exists.'); return
    }
    const initials = authForm.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2)
    const newUser = {
      id: 'u_' + Date.now(),
      name: authForm.name,
      email: authForm.email,
      phone: authForm.phone,
      location: authForm.location,
      password: authForm.password,
      nic: authForm.nic,
      rating: 5.0,
      reviewCount: 0,
      avatar: initials,
      isVerified: authForm.nic.length >= 10
    }
    setUsers(prev => [...prev, newUser])
    setCurrentUserId(newUser.id)
    setIsLoggedIn(true)
    localStorage.setItem('currentUserId', newUser.id)
    showToast(`Account created! Welcome, ${newUser.name}! 🎉`, 'success')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUserId('u1')
    localStorage.removeItem('currentUserId')
    setAuthForm({ name: '', email: '', phone: '', password: '', location: 'Colombo 05', nic: '' })
    setAuthError('')
    setAuthView('login')
    showToast('Logged out successfully.', 'info')
  }

  // Auth wall — show login/register if not logged in
  if (!isLoggedIn) {
    const SL_LOCATIONS = ['Colombo 05','Gampaha','Kandy','Galle','Matara','Kurunegala','Negombo','Anuradhapura','Ratnapura','Badulla','Trincomalee','Jaffna','Kalutara','Polonnaruwa','Maharagama']
    return (
      <div className={`app-wrapper ${theme}-theme`} style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', background:'var(--bg-primary)' }}>
        <div style={{ width:'100%', maxWidth:'440px' }}>
          {/* Logo */}
          <div style={{ textAlign:'center', marginBottom:'32px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', marginBottom:'8px' }}>
              <Wrench size={32} style={{ color:'var(--primary-hover)' }} />
              <span style={{ fontSize:'28px', fontWeight:'800', color:'var(--text-primary)' }}>Rent-a-Tool <span style={{ fontSize:'16px', color:'var(--text-muted)' }}>LK</span></span>
            </div>
            <p style={{ color:'var(--text-muted)', fontSize:'14px', margin:0 }}>Sri Lanka's #1 Community Tool Rental Platform</p>
          </div>

          <div className="glass-panel" style={{ padding:'32px', borderRadius:'20px' }}>
            {/* Tab Toggle */}
            <div style={{ display:'flex', background:'var(--bg-secondary)', borderRadius:'12px', padding:'4px', marginBottom:'24px' }}>
              <button onClick={() => { setAuthView('login'); setAuthError('') }} style={{ flex:1, padding:'10px', borderRadius:'10px', border:'none', cursor:'pointer', fontWeight:'600', fontSize:'14px', background: authView==='login' ? 'var(--primary-hover)' : 'transparent', color: authView==='login' ? '#fff' : 'var(--text-secondary)', transition:'all 0.2s' }}>
                Login / ඇතුල් වන්න
              </button>
              <button onClick={() => { setAuthView('register'); setAuthError('') }} style={{ flex:1, padding:'10px', borderRadius:'10px', border:'none', cursor:'pointer', fontWeight:'600', fontSize:'14px', background: authView==='register' ? 'var(--primary-hover)' : 'transparent', color: authView==='register' ? '#fff' : 'var(--text-secondary)', transition:'all 0.2s' }}>
                Register / ලියාපදිංචි
              </button>
            </div>

            {authView === 'login' ? (
              <form onSubmit={handleLogin}>
                <h2 style={{ margin:'0 0 20px', fontSize:'20px', fontWeight:'700', color:'var(--text-primary)' }}>Welcome Back 👋</h2>
                {authError && <div style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:'8px', padding:'10px 14px', color:'#ef4444', fontSize:'13px', marginBottom:'16px' }}>{authError}</div>}
                <label className="form-label">Email or Phone Number</label>
                <input className="form-input" type="text" placeholder="kasun@email.com or 0771234567" value={authForm.email} onChange={e => setAuthForm(p => ({...p, email:e.target.value}))} required style={{ marginBottom:'12px' }} />
                <label className="form-label">Password</label>
                <input className="form-input" type="password" placeholder="Enter your password" value={authForm.password} onChange={e => setAuthForm(p => ({...p, password:e.target.value}))} required style={{ marginBottom:'20px' }} />
                <button className="primary-btn" type="submit" style={{ width:'100%', justifyContent:'center' }}>Login to Rent-a-Tool</button>
                <p style={{ textAlign:'center', fontSize:'12px', color:'var(--text-muted)', marginTop:'16px' }}>
                  Demo: kasun@email.com / kasun123
                </p>
              </form>
            ) : (
              <form onSubmit={handleRegister}>
                <h2 style={{ margin:'0 0 20px', fontSize:'20px', fontWeight:'700', color:'var(--text-primary)' }}>Create Account 🚀</h2>
                {authError && <div style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:'8px', padding:'10px 14px', color:'#ef4444', fontSize:'13px', marginBottom:'16px' }}>{authError}</div>}
                <label className="form-label">Full Name *</label>
                <input className="form-input" type="text" placeholder="Kasun Perera" value={authForm.name} onChange={e => setAuthForm(p => ({...p, name:e.target.value}))} required style={{ marginBottom:'12px' }} />
                <label className="form-label">Email Address *</label>
                <input className="form-input" type="email" placeholder="kasun@email.com" value={authForm.email} onChange={e => setAuthForm(p => ({...p, email:e.target.value}))} required style={{ marginBottom:'12px' }} />
                <label className="form-label">Phone Number *</label>
                <input className="form-input" type="tel" placeholder="0771234567" value={authForm.phone} onChange={e => setAuthForm(p => ({...p, phone:e.target.value}))} required style={{ marginBottom:'12px' }} />
                <label className="form-label">Location / Province *</label>
                <select className="form-input" value={authForm.location} onChange={e => setAuthForm(p => ({...p, location:e.target.value}))} style={{ marginBottom:'12px' }}>
                  {SL_LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <label className="form-label">NIC Number (optional — for verified badge)</label>
                <input className="form-input" type="text" placeholder="199512345678" value={authForm.nic} onChange={e => setAuthForm(p => ({...p, nic:e.target.value}))} style={{ marginBottom:'12px' }} />
                <label className="form-label">Password *</label>
                <input className="form-input" type="password" placeholder="Choose a strong password" value={authForm.password} onChange={e => setAuthForm(p => ({...p, password:e.target.value}))} required style={{ marginBottom:'20px' }} />
                <button className="primary-btn" type="submit" style={{ width:'100%', justifyContent:'center' }}>Create My Account</button>
              </form>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`app-wrapper ${theme}-theme`} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Toast banners */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast-notification ${toast.type}`}>
            <Bell size={16} style={{ color: 'var(--primary-hover)' }} />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Navbar Header */}
      <header className="header-glass">
        <div className="container header-container">
          <div className="logo-section" onClick={() => setCurrentView('explore')}>
            <Wrench className="logo-icon animate-pulse" size={24} style={{ color: 'var(--primary-hover)' }} />
            <span>Rent-a-Tool <span style={{fontSize: '14px', fontWeight: '500', color: 'var(--text-muted)'}}>Lk</span></span>
          </div>

          <div className="nav-links">
            <button 
              className={`nav-item ${currentView === 'explore' ? 'active' : ''}`}
              onClick={() => setCurrentView('explore')}
            >
              Explore Tools
            </button>
            
            <button 
              className={`nav-item ${currentView === 'ai-advisor' ? 'active' : ''}`}
              onClick={() => setCurrentView('ai-advisor')}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Sparkles size={14} style={{ color: 'var(--accent)' }} /> AI Advisor
            </button>

            <button 
              className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentView('dashboard')}
            >
              Dashboard
            </button>
            <button 
              className={`nav-item ${currentView === 'chat' ? 'active' : ''}`}
              onClick={() => {
                const firstChat = chats.find(c => c.renterId === currentUserId || c.lenderId === currentUserId)
                if (firstChat) setActiveChatId(firstChat.id)
                setCurrentView('chat')
              }}
            >
              Messages
            </button>
            <button 
              className={`nav-item ${currentView === 'profile' ? 'active' : ''}`}
              onClick={() => setCurrentView('profile')}
            >
              My Profile
            </button>
            {currentUser?.role === 'admin' && (
              <button 
                className={`nav-item ${currentView === 'admin' ? 'active' : ''}`}
                onClick={() => setCurrentView('admin')}
                style={{ color: 'var(--accent)' }}
              >
                <ShieldCheck size={14} style={{ marginRight: '4px' }} /> Admin Panel
              </button>
            )}

            {/* User Profile Area */}
            <div className="user-profile-nav" style={{ display:'flex', alignItems:'center', gap:'12px', background:'rgba(255,255,255,0.05)', padding:'4px 12px', borderRadius:'20px', border:'1px solid rgba(255,255,255,0.1)' }}>
              <div className="user-avatar" style={{ width:'32px', height:'32px', fontSize:'14px' }}>
                {currentUser?.avatar}
              </div>
              <div style={{ display:'flex', flexDirection:'column', marginRight:'8px' }}>
                <span style={{ fontSize:'13px', fontWeight:'600', lineHeight:'1.2' }}>{currentUser?.name}</span>
                <span style={{ fontSize:'11px', color:'var(--text-muted)', lineHeight:'1.2' }}>{currentUser?.isVerified ? 'Verified' : 'Unverified'}</span>
              </div>
              <button 
                onClick={handleLogout}
                style={{ background:'transparent', border:'none', color:'var(--text-muted)', cursor:'pointer', padding:'4px', display:'flex', alignItems:'center', transition:'color 0.2s' }}
                title="Log Out"
                onMouseOver={e => e.currentTarget.style.color = '#ef4444'}
                onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                <LogOut size={16} />
              </button>
            </div>

            <button 
              className="theme-toggle-btn" 
              onClick={() => { setApiKeyInput(geminiApiKey); setIsApiKeyModalOpen(true) }}
              title="Setup Gemini AI API Key"
              style={{ position: 'relative' }}
            >
              <Lock size={16} />
              {geminiApiKey && (
                <span style={{
                  position: 'absolute', top: '2px', right: '2px',
                  width: '7px', height: '7px',
                  background: '#10b981', borderRadius: '50%', border: '1px solid var(--bg-primary)'
                }} />
              )}
            </button>

            <button className="theme-toggle-btn" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Area */}
      <main className="container animate-fade" style={{ flexGrow: 1, paddingBottom: '60px' }}>
        
        {/* VIEW 1: EXPLORE VIEW */}
        {currentView === 'explore' && (
          <div>
            <section className="hero-section">
              <div className="hero-glow"></div>
              <h1 className="hero-title">Share Tools. Build Together.</h1>
              <p className="hero-subtitle">
                Rent professional power tools, gardening gear, and ladders directly from your neighbors in Sri Lanka. Verified deposits and identity check.
              </p>
              
              <div className="search-filter-bar glass-panel">
                <div className="search-input-wrapper">
                  <Search className="search-icon" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search tools or DIY tasks (e.g. tile removal, lawn cutting)..." 
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <select 
                    className="filter-select" 
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option value="All">All Sri Lanka</option>
                    {locations.filter(loc => loc !== 'All').map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>

                  <div className="view-toggle-container">
                    <button 
                      className={`view-toggle-btn ${exploreViewStyle === 'grid' ? 'active' : ''}`}
                      onClick={() => setExploreViewStyle('grid')}
                    >
                      <Grid size={15} /> Grid
                    </button>
                    <button 
                      className={`view-toggle-btn ${exploreViewStyle === 'map' ? 'active' : ''}`}
                      onClick={() => setExploreViewStyle('map')}
                    >
                      <Map size={15} /> Map View
                    </button>
                  </div>
                </div>
              </div>

              {/* Natural Language Quick Shortcut Pills */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', alignSelf: 'center' }}>Smart Suggestions:</span>
                <button className="shortcut-chip" onClick={() => setSearchQuery('Jackhammer')}>
                  <Hammer size={12} style={{ color: 'var(--primary-hover)' }} /> Concrete Demolition
                </button>
                <button className="shortcut-chip" onClick={() => setSearchQuery('Trimmer')}>
                  <Leaf size={12} style={{ color: 'var(--success)' }} /> Lawn Care & Trimming
                </button>
                <button className="shortcut-chip" onClick={() => setSearchQuery('Pressure')}>
                  <Zap size={12} style={{ color: 'var(--accent)' }} /> High Pressure Wash
                </button>
                <button className="shortcut-chip" onClick={() => setSearchQuery('Ladder')}>
                  <SlidersHorizontal size={12} style={{ color: 'var(--secondary)' }} /> High Height Work
                </button>
                {searchQuery && (
                  <button className="shortcut-chip" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={() => setSearchQuery('')}>
                    Clear Search
                  </button>
                )}
              </div>

              <div className="categories-container">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </section>



            <section>
              <div className="listings-header">
                <h2 className="section-title">Available Tools Nearby</h2>
                <span className="listings-count">Showing {filteredTools.length} tools</span>
              </div>

              {filteredTools.length === 0 ? (
                <div className="empty-state">
                  <AlertTriangle className="empty-state-icon" />
                  <h3>No tools found</h3>
                  <p>Try refining your search terms or selecting another location.</p>
                </div>
              ) : exploreViewStyle === 'grid' ? (
                // GRID VIEW
                <div className="listings-grid">
                  {filteredTools.map(tool => {
                    const owner = users.find(u => u.id === tool.ownerId) || { name: 'Owner', isVerified: false }
                    const isCompared = compareToolIds.includes(tool.id)

                    return (
                      <div 
                        key={tool.id} 
                        className="tool-card animate-fade"
                        onClick={() => setSelectedTool(tool)}
                      >
                        <div className="tool-card-image-wrapper">
                          <span className={`availability-tag ${tool.availability}`}>
                            {tool.availability}
                          </span>
                          <div className="tool-card-icon-container">
                            <Wrench size={34} />
                          </div>

                          {/* Compare Checkbox Button */}
                          <button 
                            className="secondary-btn"
                            style={{
                              position: 'absolute',
                              bottom: '10px',
                              right: '10px',
                              padding: '4px 10px',
                              fontSize: '11px',
                              borderRadius: '20px',
                              borderColor: isCompared ? '#10b981' : 'var(--border-color)',
                              background: isCompared ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0,0,0,0.6)',
                              color: isCompared ? '#34d399' : 'var(--text-secondary)'
                            }}
                            onClick={(e) => {
                              e.stopPropagation()
                              if (isCompared) {
                                setCompareToolIds(prev => prev.filter(id => id !== tool.id))
                              } else {
                                if (compareToolIds.length >= 3) {
                                  showToast('You can compare up to 3 tools at once!', 'warning')
                                  return
                                }
                                setCompareToolIds(prev => [...prev, tool.id])
                              }
                            }}
                          >
                            <Scale size={12} /> {isCompared ? 'Compared' : '+ Compare'}
                          </button>
                        </div>
                        
                        <div className="tool-card-body">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="tool-card-category">{tool.category}</span>
                            <span className="discount-pill">🔥 3+ Days = 10% OFF</span>
                          </div>

                          <h3 className="tool-card-title">{tool.title}</h3>
                          <p className="tool-card-desc">{tool.description}</p>
                          
                          <div className="tool-card-price-row">
                            <div className="tool-card-price">
                              රු. {tool.rate.toLocaleString()}<span> / day</span>
                            </div>
                            <div className="tool-card-rating">
                              <Star size={14} className="star-icon" />
                              <span>{tool.rating} ({tool.reviews.length})</span>
                            </div>
                          </div>

                          <div className="tool-card-meta">
                            <div className="tool-card-location">
                              <MapPin size={14} style={{ color: 'var(--primary)' }} />
                              <span>{tool.location}</span>
                            </div>
                            <span className="tool-owner" style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                              By {owner.name}
                              {owner.isVerified && <ShieldCheck size={13} style={{ color: 'var(--success)' }} />}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                // MAP VIEW
                <div className="map-layout-container">
                  <div className="map-radar-panel">
                    <div className="map-radar-circle c1"></div>
                    <div className="map-radar-circle c2"></div>
                    <div className="map-radar-circle c3"></div>
                    
                    <div className="map-city-label" style={{ top: '25%', left: '40%' }}>Colombo</div>
                    <div className="map-city-label" style={{ top: '48%', left: '60%' }}>Maharagama</div>
                    <div className="map-city-label" style={{ top: '65%', left: '20%' }}>Kandy</div>

                    {filteredTools.map(tool => (
                      <div 
                        key={tool.id} 
                        className={`map-marker ${selectedTool?.id === tool.id ? 'selected' : ''}`}
                        style={{ left: `${tool.mapX}%`, top: `${tool.mapY}%` }}
                        onClick={() => setSelectedTool(tool)}
                      >
                        <div className="map-marker-pulse"></div>
                        <div className="map-marker-dot"></div>
                        <span style={{ 
                          position: 'absolute', 
                          top: '18px', 
                          left: '-20px', 
                          background: 'rgba(7, 10, 19, 0.85)',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          border: '1px solid rgba(255,255,255,0.08)',
                          fontSize: '10px',
                          whiteSpace: 'nowrap'
                        }}>
                          {tool.title}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="map-info-sidebar">
                    <h3>Map Selection Details</h3>
                    {selectedTool ? (
                      <div className="tool-card" style={{ height: 'auto', background: 'var(--bg-card-hover)' }}>
                        <div className="tool-card-body">
                          <span className="tool-card-category">{selectedTool.category}</span>
                          <h3>{selectedTool.title}</h3>
                          <p style={{ margin: '8px 0', fontSize: '13px' }}>{selectedTool.description}</p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                            <span style={{ fontSize: '16px', fontWeight: '800' }}>රු. {selectedTool.rate}/day</span>
                            <button 
                              className="primary-btn animate-pulse" 
                              style={{ padding: '8px 16px', fontSize: '12px' }}
                              onClick={() => setSelectedTool(selectedTool)}
                            >
                              Request / Book
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="empty-state" style={{ padding: '40px 10px' }}>
                        <Info className="empty-state-icon" />
                        <p>Click on any marker dot on the sitemap to review tool specifications.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </section>
          </div>
        )}

        {/* VIEW 2: AI PROJECT ADVISOR (THINKING FEATURE) */}
        {currentView === 'ai-advisor' && (
          <div className="ai-advisor-container">
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div className="ai-header-badge">
                <Sparkles size={14} /> AI Thinking Engine
              </div>
              <h1 className="hero-title" style={{ fontSize: '40px' }}>Smart DIY Project Advisor</h1>
              <p className="hero-subtitle" style={{ maxWidth: '650px' }}>
                Describe your project or select a template below. Our AI evaluates required tools, calculates cost savings vs hiring contractors, and provides step-by-step safety guides.
              </p>

              {/* Natural Language Prompt Input */}
              <div className="glass-panel" style={{ maxWidth: '750px', margin: '0 auto', padding: '12px', display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  className="search-input"
                  style={{ border: 'none', background: 'transparent', paddingLeft: '14px' }}
                  placeholder="Describe your project (e.g. 'Demolishing old kitchen floor tiles and laying new ones')..."
                  value={aiProjectQuery}
                  onChange={(e) => {
                    setAiProjectQuery(e.target.value)
                    setSelectedPresetProject(null)
                  }}
                />
                <button 
                  className="primary-btn"
                  style={{ flexShrink: 0, padding: '12px 24px' }}
                  onClick={() => handleRunAiAdvisor()}
                  disabled={aiThinking}
                >
                  <Sparkles size={16} /> Analyze Project
                </button>
              </div>
            </div>

            {/* Preset Project Templates */}
            <div>
              <h3 style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Or Choose a Popular DIY Template:
              </h3>

              <div className="preset-projects-grid">
                {PRESET_PROJECTS.map(p => (
                  <div 
                    key={p.id} 
                    className={`preset-project-card ${selectedPresetProject?.id === p.id ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedPresetProject(p)
                      setAiProjectQuery(p.title)
                      handleRunAiAdvisor(p)
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="tool-card-category">{p.category}</span>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--success)' }}>
                        Save ~රු. {(p.contractorCost - 7000).toLocaleString()}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: '700' }}>{p.title}</h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{p.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Thinking Animation State */}
            {aiThinking && (
              <div className="ai-thinking-card animate-fade">
                <div className="ai-thinking-spinner"></div>
                <h3 style={{ fontSize: '20px', color: 'var(--text-primary)' }}>AI Engine Thinking...</h3>
                <div style={{ fontSize: '14px', color: 'var(--primary-hover)', fontWeight: '600' }}>
                  {aiThinkingStep === 1 && '• Step 1/3: Analyzing project materials and task complexity...'}
                  {aiThinkingStep === 2 && '• Step 2/3: Searching neighborhood tool inventory in Sri Lanka...'}
                  {aiThinkingStep === 3 && '• Step 3/3: Calculating optimal rental duration & cost savings...'}
                </div>
              </div>
            )}

            {/* AI Recommendation Output Report */}
            {aiResult && !aiThinking && (
              <div className="ai-result-panel animate-fade">
                <div className="glass-panel" style={{ padding: '28px', borderLeft: '4px solid var(--accent)' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
                    <div>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                        <span className="ai-header-badge">
                          <CheckCircle size={13} /> Project Recommendation Report
                        </span>
                        {aiResult.aiSource === 'gemini' && (
                          <span className="ai-header-badge" style={{ background: 'rgba(16,185,129,0.15)', borderColor: 'rgba(16,185,129,0.3)', color: '#34d399' }}>
                            <Sparkles size={12} /> Powered by Gemini AI
                          </span>
                        )}
                        {aiResult.aiSource === 'local' && (
                          <span className="ai-header-badge" style={{ background: 'rgba(251,191,36,0.12)', borderColor: 'rgba(251,191,36,0.3)', color: '#fbbf24' }}>
                            <Zap size={12} /> Local Match (Add API Key for AI)
                          </span>
                        )}
                      </div>
                      <h2 style={{ fontSize: '24px' }}>{aiResult.query}</h2>
                      {aiResult.explanation && (
                        <p style={{ margin: '6px 0 0', fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '500px' }}>
                          💬 {aiResult.explanation}
                        </p>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '16px', textAlign: 'right' }}>
                      <div>
                        <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Estimated Rental</div>
                        <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary-hover)' }}>
                          රු. {aiResult.rentalCost.toLocaleString()}
                        </div>
                      </div>
                      <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '16px' }}>
                        <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Contractor Quote</div>
                        <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                          රු. {aiResult.contractorCost.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Savings Banner */}
                  <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '14px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                    <TrendingUp style={{ color: '#34d399' }} size={24} />
                    <div>
                      <span style={{ fontSize: '15px', fontWeight: '700', color: '#34d399' }}>
                        You Save ~රු. {aiResult.savings.toLocaleString()} by Renting & DIY!
                      </span>
                      <p style={{ fontSize: '12px', margin: 0, color: 'var(--text-secondary)' }}>
                        Completing this in {aiResult.durationDays} day(s) saves money while keeping tools in circular neighborhood reuse.
                      </p>
                    </div>
                  </div>

                  {/* Recommended Tool Cards */}
                  <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Wrench size={16} style={{ color: 'var(--primary-hover)' }} /> Recommended Marketplace Tools ({aiResult.matchingTools.length})
                    </h3>

                    <div className="listings-grid" style={{ marginBottom: 0 }}>
                      {aiResult.matchingTools.map(tool => (
                        <div key={tool.id} className="tool-card" style={{ background: 'var(--bg-card-hover)' }}>
                          <div className="tool-card-body">
                            <span className="tool-card-category">{tool.category}</span>
                            <h4>{tool.title}</h4>
                            <p style={{ fontSize: '13px', margin: '6px 0 12px 0' }}>{tool.description}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                              <span style={{ fontSize: '16px', fontWeight: '800' }}>රු. {tool.rate}/day</span>
                              <button 
                                className="primary-btn" 
                                style={{ padding: '6px 14px', fontSize: '12px' }}
                                onClick={() => setSelectedTool(tool)}
                              >
                                Book Now
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step-by-Step AI Guide */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                    <div>
                      <h3 style={{ fontSize: '16px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Lightbulb size={16} style={{ color: 'var(--accent)' }} /> Recommended Step-by-Step Procedure
                      </h3>
                      <div className="ai-steps-list">
                        {aiResult.steps.map((step, idx) => (
                          <div key={idx} className="ai-step-item">
                            <span className="ai-step-num">{idx + 1}</span>
                            <span style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 style={{ fontSize: '16px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <ShieldAlert size={16} style={{ color: 'var(--danger)' }} /> Safety Gear Checklist
                      </h3>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {aiResult.safetyGear.map((gear, idx) => (
                          <span key={idx} style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Check size={12} /> {gear}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>
        )}

        {/* VIEW 3: DASHBOARD */}
        {currentView === 'dashboard' && (
          <div className="dashboard-container">
            <h1 className="hero-title" style={{ fontSize: '36px', textAlign: 'left', marginBottom: '24px' }}>
              Dashboard
            </h1>
            
            <div className="dashboard-tabs">
              <button 
                className={`tab-btn ${dashTab === 'renting' ? 'active' : ''}`}
                onClick={() => setDashTab('renting')}
              >
                Renting (As Renter)
              </button>
              <button 
                className={`tab-btn ${dashTab === 'lending' ? 'active' : ''}`}
                onClick={() => setDashTab('lending')}
              >
                Lending (As Owner)
              </button>
            </div>

            {/* Renting Section */}
            {dashTab === 'renting' && (
              <div className="dashboard-section">
                <div className="dash-header-row">
                  <h2>My Booked Tools</h2>
                  <button className="secondary-btn" onClick={() => setCurrentView('explore')}>
                    Explore Tools List
                  </button>
                </div>

                {bookings.filter(b => b.renterId === currentUserId).length === 0 ? (
                  <div className="empty-state">
                    <Clock className="empty-state-icon" />
                    <h3>No rental bookings found</h3>
                    <p>Rent a tool to view active bookings and status indicators here.</p>
                  </div>
                ) : (
                  <div className="booking-list">
                    {bookings.filter(b => b.renterId === currentUserId).map(booking => {
                      const tool = tools.find(t => t.id === booking.toolId) || { title: 'Unknown Tool', deposit: 0 }
                      const lender = users.find(u => u.id === booking.lenderId) || { name: 'Owner', phone: 'N/A', isVerified: false }

                      return (
                        <div key={booking.id} className="booking-item-card glass-panel" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                            <div className="booking-item-left">
                              <div className="booking-item-icon-wrapper">
                                <Wrench size={24} />
                              </div>
                              <div className="booking-item-details">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <h3 className="booking-item-title">{tool.title}</h3>
                                  <span className={`booking-badge ${booking.status}`}>{booking.status}</span>
                                </div>
                                <div className="booking-item-info-line">
                                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                    Lender: <strong>{lender.name} ({lender.phone})</strong>
                                    {lender.isVerified && <ShieldCheck size={13} style={{ color: 'var(--success)' }} />}
                                  </span>
                                  <span>Dates: <strong>{booking.startDate} to {booking.endDate}</strong></span>
                                </div>
                                <div className="booking-item-info-line" style={{ marginTop: '3px' }}>
                                  <span>Rental Cost: <strong>රු. {booking.totalPrice.toLocaleString()}</strong></span>
                                  <span style={{ color: 'var(--accent)' }}>Refundable Deposit: <strong>රු. {booking.depositPrice.toLocaleString()}</strong></span>
                                  {booking.protectionPlan && (
                                    <span style={{ color: 'var(--success)', fontSize: '11px' }}>🛡️ {booking.protectionPlan}</span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="booking-actions">
                              {/* Printable Invoice & Agreement Button */}
                              <button 
                                className="secondary-btn"
                                style={{ padding: '8px 14px', fontSize: '12px' }}
                                onClick={() => setInvoiceBooking(booking)}
                              >
                                <Printer size={13} /> Printable Contract & Invoice
                              </button>

                              <button 
                                className="secondary-btn"
                                style={{ padding: '8px 14px', fontSize: '13px' }}
                                onClick={() => startChatWith(booking.lenderId, booking.toolId)}
                              >
                                <MessageSquare size={13} /> Chat
                              </button>

                              {booking.status === 'pending' && (
                                <button 
                                  className="danger-btn"
                                  onClick={() => updateBookingStatus(booking.id, 'declined', 'Request cancelled by Renter')}
                                >
                                  Cancel Request
                                </button>
                              )}

                              {booking.status === 'approved' && (
                                <button 
                                  className="success-btn"
                                  style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', borderColor: 'rgba(99, 102, 241, 0.3)' }}
                                  onClick={() => openQrScanner(booking, 'pickup')}
                                >
                                  <QrCode size={14} /> Scan Handover QR
                                </button>
                              )}

                              {booking.status === 'active' && (
                                <button 
                                  className="primary-btn"
                                  style={{ padding: '8px 16px', fontSize: '13px' }}
                                  onClick={() => openQrScanner(booking, 'return')}
                                >
                                  <QrCode size={14} /> Verify Return QR
                                </button>
                              )}

                              {booking.status === 'returned' && !booking.renterReviewed && (
                                <button 
                                  className="success-btn"
                                  onClick={() => handleOpenReview(booking, 'tool')}
                                >
                                  <MessageSquare size={14} /> Leave Review
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Audit Logs Trail */}
                          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                            <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <FileText size={12} /> Transaction Log History
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              {booking.logs.map((log, idx) => (
                                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)' }}>
                                  <span>• {log.action}</span>
                                  <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{log.time}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Lending Section */}
            {dashTab === 'lending' && (
              <div className="dashboard-section">
                <div className="dash-header-row">
                  <h2>My Listings & Requests</h2>
                  <button className="primary-btn" onClick={() => {
                    setEditTool(null)
                    setUploadedImagePreset('')
                    setNewToolForm({
                      title: '',
                      category: 'Power Tools',
                      description: '',
                      rate: '',
                      deposit: '',
                      location: currentUser.location,
                      iconPreset: 'drill'
                    })
                    setIsAddToolOpen(true)
                  }}>
                    <Plus size={16} /> List a New Tool
                  </button>
                </div>

                {/* Incoming Requests */}
                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                    Incoming Rental Requests
                  </h3>
                  
                  {bookings.filter(b => b.lenderId === currentUserId && b.status === 'pending').length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', fontStyle: 'italic' }}>
                      No pending requests.
                    </p>
                  ) : (
                    <div className="booking-list" style={{ marginBottom: '30px' }}>
                      {bookings.filter(b => b.lenderId === currentUserId && b.status === 'pending').map(booking => {
                        const tool = tools.find(t => t.id === booking.toolId) || { title: 'Unknown Tool' }
                        const renter = users.find(u => u.id === booking.renterId) || { name: 'Renter', rating: 5, isVerified: false }
                        const hasClash = isDateOverlapping(booking.toolId, booking.startDate, booking.endDate, booking.id)

                        return (
                          <div key={booking.id} className="booking-item-card glass-panel" style={{ borderLeft: '4px solid var(--accent)' }}>
                            <div className="booking-item-left">
                              <div className="booking-item-icon-wrapper" style={{ color: 'var(--accent)' }}>
                                <Clock size={24} />
                              </div>
                              <div className="booking-item-details">
                                <h4 className="booking-item-title">{tool.title}</h4>
                                <div className="booking-item-info-line">
                                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                    Renter: <strong>{renter.name} (⭐{renter.rating})</strong>
                                    {renter.isVerified && <ShieldCheck size={13} style={{ color: 'var(--success)' }} />}
                                  </span>
                                  <span>Dates: <strong>{booking.startDate} to {booking.endDate}</strong></span>
                                </div>
                                <div className="booking-item-info-line" style={{ marginTop: '2px' }}>
                                  <span>Rental Income: <strong>රු. {booking.totalPrice.toLocaleString()}</strong></span>
                                  <span style={{ color: 'var(--accent)' }}>Deposit Held: <strong>රු. {booking.depositPrice.toLocaleString()}</strong></span>
                                </div>
                                {hasClash && (
                                  <span style={{ color: 'var(--danger)', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                                    <AlertTriangle size={12} /> Clash: Already booked for these dates!
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <div className="booking-actions">
                              <button 
                                className="secondary-btn"
                                style={{ padding: '8px 14px', fontSize: '13px' }}
                                onClick={() => startChatWith(booking.renterId, booking.toolId)}
                              >
                                <MessageSquare size={13} /> Chat
                              </button>
                              <button 
                                className="success-btn"
                                disabled={hasClash}
                                onClick={() => {
                                  updateBookingStatus(booking.id, 'approved', 'Request Approved by Owner')
                                  setTools(prev => prev.map(t => t.id === booking.toolId ? { ...t, availability: 'unavailable' } : t))
                                }}
                              >
                                Accept
                              </button>
                              <button 
                                className="danger-btn"
                                onClick={() => updateBookingStatus(booking.id, 'declined', 'Request Declined by Owner')}
                              >
                                Decline
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Active Loans & History */}
                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                    Active Loans & History
                  </h3>
                  
                  {bookings.filter(b => b.lenderId === currentUserId && b.status !== 'pending').length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', fontStyle: 'italic', marginBottom: '30px' }}>
                      No active loans or history logs.
                    </p>
                  ) : (
                    <div className="booking-list" style={{ marginBottom: '30px' }}>
                      {bookings.filter(b => b.lenderId === currentUserId && b.status !== 'pending').map(booking => {
                        const tool = tools.find(t => t.id === booking.toolId) || { title: 'Unknown Tool' }
                        const renter = users.find(u => u.id === booking.renterId) || { name: 'Renter', phone: 'N/A', isVerified: false }

                        return (
                          <div key={booking.id} className="booking-item-card glass-panel" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                              <div className="booking-item-left">
                                <div className="booking-item-icon-wrapper">
                                  <CheckCircle size={24} />
                                </div>
                                <div className="booking-item-details">
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <h4 className="booking-item-title">{tool.title}</h4>
                                    <span className={`booking-badge ${booking.status}`}>{booking.status}</span>
                                  </div>
                                  <div className="booking-item-info-line">
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                      Renter: <strong>{renter.name} ({renter.phone})</strong>
                                      {renter.isVerified && <ShieldCheck size={13} style={{ color: 'var(--success)' }} />}
                                    </span>
                                    <span>Dates: <strong>{booking.startDate} to {booking.endDate}</strong></span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="booking-actions">
                                <button 
                                  className="secondary-btn"
                                  style={{ padding: '8px 14px', fontSize: '12px' }}
                                  onClick={() => setInvoiceBooking(booking)}
                                >
                                  <Printer size={13} /> Printable Agreement
                                </button>
                                <button 
                                  className="secondary-btn"
                                  style={{ padding: '8px 14px', fontSize: '13px' }}
                                  onClick={() => startChatWith(booking.renterId, booking.toolId)}
                                >
                                  <MessageSquare size={13} /> Chat
                                </button>
                                
                                {booking.status === 'approved' && (
                                  <button 
                                    className="success-btn"
                                    onClick={() => openQrScanner(booking, 'pickup')}
                                  >
                                    <QrCode size={14} /> Scan Handover QR
                                  </button>
                                )}
                                {booking.status === 'active' && (
                                  <button 
                                    className="primary-btn"
                                    style={{ padding: '8px 16px', fontSize: '13px' }}
                                    onClick={() => openQrScanner(booking, 'return')}
                                  >
                                    <QrCode size={14} /> Scan Return QR
                                  </button>
                                )}
                                {booking.status === 'returned' && !booking.lenderReviewed && (
                                  <button 
                                    className="success-btn"
                                    onClick={() => handleOpenReview(booking, 'renter')}
                                  >
                                    Rate Renter
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* My Tool Inventory */}
                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                    My Tool Inventory
                  </h3>
                  
                  {tools.filter(t => t.ownerId === currentUserId).length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', fontStyle: 'italic' }}>
                      No tools listed. Click 'List a New Tool' to start.
                    </p>
                  ) : (
                    <div className="listings-grid">
                      {tools.filter(t => t.ownerId === currentUserId).map(tool => (
                        <div key={tool.id} className="tool-card animate-fade">
                          <div className="tool-card-image-wrapper">
                            <span className={`availability-tag ${tool.availability}`}>
                              {tool.availability}
                            </span>
                            <div className="tool-card-icon-container">
                              <Wrench size={34} />
                            </div>
                          </div>
                          
                          <div className="tool-card-body">
                            <span className="tool-card-category">{tool.category}</span>
                            <h3 className="tool-card-title">{tool.title}</h3>
                            
                            <div className="tool-card-price-row" style={{ marginTop: 'auto', paddingTop: '10px' }}>
                              <div className="tool-card-price">
                                රු. {tool.rate.toLocaleString()}<span> / day</span>
                              </div>
                            </div>

                            <div className="tool-card-meta" style={{ marginTop: '14px', paddingTop: '14px' }}>
                              <div className="booking-actions" style={{ width: '100%', justifyContent: 'space-between' }}>
                                <button 
                                  className="secondary-btn" 
                                  style={{ padding: '6px 12px', fontSize: '12px' }}
                                  onClick={() => toggleToolAvailability(tool.id, tool.availability)}
                                >
                                  Toggle Active
                                </button>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                  <button 
                                    className="secondary-btn" 
                                    style={{ padding: '6px', minWidth: '32px' }}
                                    onClick={() => handleEditToolClick(tool)}
                                  >
                                    <Edit3 size={14} />
                                  </button>
                                  <button 
                                    className="danger-btn" 
                                    style={{ padding: '6px', minWidth: '32px' }}
                                    onClick={() => handleDeleteTool(tool.id)}
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 4: CHAT VIEW */}
        {currentView === 'chat' && (
          <div style={{ padding: '30px 0' }}>
            <h1 className="hero-title" style={{ fontSize: '36px', textAlign: 'left', marginBottom: '20px' }}>
              Messages
            </h1>

            {chats.filter(c => c.renterId === currentUserId || c.lenderId === currentUserId).length === 0 ? (
              <div className="empty-state">
                <MessageSquare className="empty-state-icon" />
                <h3>No messages yet</h3>
                <p>Send an owner a message from the Explore directory to start a chat.</p>
              </div>
            ) : (
              <div className="chat-container glass-panel">
                
                <div className="chat-sidebar">
                  <div className="chat-sidebar-header">Conversations</div>
                  <div className="chat-user-list">
                    {chats.filter(c => c.renterId === currentUserId || c.lenderId === currentUserId).map(c => {
                      const peerId = c.renterId === currentUserId ? c.lenderId : c.renterId
                      const peerUser = users.find(u => u.id === peerId) || { name: 'User' }
                      const tool = tools.find(t => t.id === c.toolId) || { title: 'Tool' }

                      return (
                        <div 
                          key={c.id} 
                          className={`chat-user-item ${activeChatId === c.id ? 'active' : ''}`}
                          onClick={() => setActiveChatId(c.id)}
                        >
                          <div className="user-avatar" style={{ width: '32px', height: '32px', fontSize: '11px', flexShrink: 0 }}>
                            {peerUser.avatar || 'U'}
                          </div>
                          <div className="chat-user-details">
                            <span className="chat-user-name" style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                              {peerUser.name}
                              {peerUser.isVerified && <ShieldCheck size={11} style={{ color: 'var(--success)' }} />}
                            </span>
                            <span className="chat-user-sub">{tool.title}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="chat-window">
                  {activeChatId ? (() => {
                    const chat = chats.find(c => c.id === activeChatId)
                    const peerId = chat.renterId === currentUserId ? chat.lenderId : chat.renterId
                    const peerUser = users.find(u => u.id === peerId) || { name: 'User' }
                    const toolObj = tools.find(t => t.id === chat.toolId) || { title: 'Tool' }

                    return (
                      <>
                        <div className="chat-window-header">
                          <div>
                            <h3 style={{ fontSize: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              {peerUser.name}
                              {peerUser.isVerified && <ShieldCheck size={14} style={{ color: 'var(--success)' }} />}
                            </h3>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Discussing: {toolObj.title}</span>
                          </div>
                          <button 
                            className="secondary-btn" 
                            style={{ padding: '6px 12px', fontSize: '12px' }}
                            onClick={() => setSelectedTool(toolObj)}
                          >
                            View Tool Info
                          </button>
                        </div>

                        <div className="chat-messages-area">
                          {chat.messages.length === 0 ? (
                            <p style={{ margin: 'auto', color: 'var(--text-muted)', fontSize: '13px', fontStyle: 'italic' }}>
                              Say hi to start the negotiation!
                            </p>
                          ) : (
                            chat.messages.map(msg => (
                              <div key={msg.id} className={`chat-bubble-row ${msg.senderId === currentUserId ? 'sent' : 'received'}`}>
                                <div className="chat-bubble">
                                  {msg.text}
                                  <span className="chat-bubble-time">{msg.timestamp}</span>
                                </div>
                              </div>
                            ))
                          )}
                          <div ref={chatEndRef} />
                        </div>

                        <form onSubmit={sendChatMessage} className="chat-input-row">
                          <input 
                            type="text" 
                            placeholder="Type a message..."
                            className="chat-input-field"
                            value={chatMessageText}
                            onChange={(e) => setChatMessageText(e.target.value)}
                          />
                          <button type="submit" className="primary-btn" style={{ padding: '10px 16px', borderRadius: '12px' }}>
                            <Send size={16} /> Send
                          </button>
                        </form>
                      </>
                    )
                  })() : (
                    <div style={{ margin: 'auto', textAlign: 'center', padding: '20px' }}>
                      <MessageSquare size={36} style={{ color: 'var(--text-muted)', marginBottom: '10px' }} />
                      <p>Select an active conversation to check chat details.</p>
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>
        )}

        {/* VIEW 5: PROFILE */}
        {currentView === 'profile' && (
          <div className="dashboard-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 className="hero-title" style={{ fontSize: '36px', textAlign: 'left', marginBottom: '24px' }}>
              My Profile
            </h1>

            <div className="glass-panel" style={{ padding: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                <div className="user-avatar" style={{ width: '80px', height: '80px', fontSize: '28px' }}>
                  {currentUser.avatar}
                </div>
                <div>
                  <h2 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {currentUser.name}
                    {currentUser.isVerified && <ShieldCheck size={22} style={{ color: 'var(--success)' }} />}
                  </h2>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px' }}>
                    <Star size={14} className="star-icon" /> 
                    <strong>{currentUser.rating}</strong> ({currentUser.reviewCount} reviews)
                  </p>
                  <div style={{ marginTop: '6px' }}>
                    {currentUser.isVerified ? (
                      <span className="availability-tag available" style={{ position: 'static', textTransform: 'none', fontSize: '12px' }}>
                        🛡️ National ID Verified ({currentUser.nic})
                      </span>
                    ) : (
                      <span className="availability-tag unavailable" style={{ position: 'static', textTransform: 'none', fontSize: '12px' }}>
                        ⚠️ Identity Not Verified (No NIC provided)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <form onSubmit={handleUpdateProfile} className="form-grid">
                <div className="form-group form-grid-full">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    value={profileForm.name} 
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Contact Number</label>
                  <input 
                    type="tel" 
                    value={profileForm.phone} 
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Pickup Location (City)</label>
                  <input 
                    type="text" 
                    value={profileForm.location} 
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                  />
                </div>

                <div className="form-group form-grid-full" style={{ background: 'rgba(0,0,0,0.1)', padding: '14px', borderRadius: '10px', marginTop: '8px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '700', color: 'var(--text-primary)' }}>
                    <Lock size={14} style={{ color: 'var(--primary)' }} /> National Identity Card (NIC) Verification
                  </label>
                  <p style={{ fontSize: '12px', margin: '4px 0 10px 0' }}>
                    Verify your identity by typing your National ID number. This unlocks a verified badge, increases trust scores, and secures deposits.
                  </p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input 
                      type="text" 
                      placeholder="e.g. 199512345678 or 951234567V"
                      style={{ flexGrow: 1 }}
                      value={profileForm.nic}
                      onChange={(e) => setProfileForm({ ...profileForm, nic: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-grid-full" style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" className="primary-btn">
                    Save Profile Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* FLOATING COMPARISON BAR */}
      {compareToolIds.length > 0 && (
        <div className="comparison-floating-bar animate-fade">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Scale size={18} style={{ color: 'var(--primary)' }} />
            <span style={{ fontSize: '13px', fontWeight: '700' }}>
              Comparing {compareToolIds.length} {compareToolIds.length === 1 ? 'Tool' : 'Tools'}
            </span>
          </div>
          <button className="primary-btn" style={{ padding: '6px 14px', fontSize: '12px' }} onClick={() => setIsCompareOpen(true)}>
            Compare Specs
          </button>
          <button className="secondary-btn" style={{ padding: '6px 10px', fontSize: '11px' }} onClick={() => setCompareToolIds([])}>
            Clear
          </button>
        </div>
      )}

      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-brand">Rent-a-Tool Lk</div>
          <p className="footer-text">
            © 2026 Peer-to-Peer Tool Sharing Community Marketplace Sri Lanka.
          </p>
        </div>
      </footer>

      {/* MODAL 1: TOOL DETAILS & BOOKING REQUEST */}
      {selectedTool && (
        <div className="modal-overlay" onClick={() => setSelectedTool(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '820px' }}>
            <div className="modal-header">
              <h2>Tool Details & Smart Booking</h2>
              <button className="modal-close-btn" onClick={() => setSelectedTool(null)}>&times;</button>
            </div>
            
            <div className="modal-body">
              <div className="tool-detail-grid">
                
                <div>
                  <div className="detail-gallery">
                    <Wrench size={80} />
                  </div>
                  <h3 style={{ marginTop: '16px', marginBottom: '8px' }}>Description</h3>
                  <p style={{ fontSize: '14.5px', lineHeight: '1.5' }}>{selectedTool.description}</p>

                  {/* Pre-Handover Diagnostic Checklist Widget */}
                  <div className="health-checklist-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '700', color: '#34d399' }}>
                      <FileCheck size={16} /> 100% Pre-Handover Health Inspection Certified
                    </div>
                    <div className="health-grid">
                      <div className="health-item">
                        <CheckCircle size={14} style={{ color: '#34d399' }} /> Motor: <strong>{selectedTool.health?.motor || '100% Operational'}</strong>
                      </div>
                      <div className="health-item">
                        <CheckCircle size={14} style={{ color: '#34d399' }} /> Safety: <strong>{selectedTool.health?.cable || 'Tested & Inspected'}</strong>
                      </div>
                      <div className="health-item">
                        <CheckCircle size={14} style={{ color: '#34d399' }} /> Bits/Blade: <strong>{selectedTool.health?.bit || 'Sharp & Clean'}</strong>
                      </div>
                      <div className="health-item">
                        <CheckCircle size={14} style={{ color: '#34d399' }} /> Hygiene: <strong>{selectedTool.health?.sanitized || 'Sanitized'}</strong>
                      </div>
                    </div>
                  </div>
                  
                  <div className="reviews-section">
                    <h4 style={{ fontSize: '15px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MessageSquare size={16} /> Community Reviews ({selectedTool.reviews.length})
                    </h4>
                    {selectedTool.reviews.length === 0 ? (
                      <p style={{ color: 'var(--text-muted)', fontSize: '13px', fontStyle: 'italic' }}>
                        No reviews yet. Rent this tool and share your rating!
                      </p>
                    ) : (
                      selectedTool.reviews.map(r => (
                        <div key={r.id} className="review-item">
                          <div className="review-header">
                            <span className="review-author">{r.author}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                              <Star size={12} className="star-icon" /> {r.rating}
                            </span>
                          </div>
                          <p className="review-comment">"{r.comment}"</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="detail-info">
                  <span className="tool-card-category">{selectedTool.category}</span>
                  <h2>{selectedTool.title}</h2>
                  
                  <div className="detail-price-box">
                    <span className="detail-label">Rental rate</span>
                    <div style={{ fontSize: '24px', fontWeight: '800' }}>
                      රු. {selectedTool.rate.toLocaleString()} <span style={{ fontSize: '14px', fontWeight: 'normal', color: 'var(--text-secondary)' }}>/ day</span>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: '600', marginTop: '4px' }}>
                      Refundable Security Deposit: රු. {(selectedTool.deposit || 0).toLocaleString()}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      Location: <strong>{selectedTool.location}</strong>
                    </div>
                  </div>

                  {/* Owner snippet */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
                    <div className="user-avatar" style={{ width: '32px', height: '32px', fontSize: '12px' }}>
                      {users.find(u => u.id === selectedTool.ownerId)?.avatar || 'O'}
                    </div>
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        Lended by {users.find(u => u.id === selectedTool.ownerId)?.name}
                        {users.find(u => u.id === selectedTool.ownerId)?.isVerified && <ShieldCheck size={13} style={{ color: 'var(--success)' }} />}
                      </div>
                      <div style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <Star size={10} className="star-icon" /> {users.find(u => u.id === selectedTool.ownerId)?.rating} rating
                      </div>
                    </div>
                    
                    <button 
                      className="secondary-btn" 
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                      onClick={() => startChatWith(selectedTool.ownerId, selectedTool.id)}
                    >
                      Chat
                    </button>
                  </div>

                  {/* Booking form */}
                  <div className="booking-card">
                    <h4 style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={16} /> Select Dates & Multi-day Discounts
                    </h4>

                    {selectedTool.availability !== 'available' ? (
                      <div style={{ color: 'var(--danger)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <XCircle size={16} /> Tool is currently unavailable or booked out.
                      </div>
                    ) : (
                      <form onSubmit={handleCreateBooking} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div className="booking-date-inputs">
                          <div className="date-field">
                            <label>Start Date</label>
                            <input 
                              type="date" 
                              required
                              value={bookingStart}
                              min={new Date().toISOString().split('T')[0]}
                              onChange={(e) => setBookingStart(e.target.value)}
                            />
                          </div>
                          <div className="date-field">
                            <label>End Date</label>
                            <input 
                              type="date" 
                              required
                              value={bookingEnd}
                              min={bookingStart || new Date().toISOString().split('T')[0]}
                              onChange={(e) => setBookingEnd(e.target.value)}
                            />
                          </div>
                        </div>

                        {/* Damage Protection Options */}
                        <div>
                          <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                            Optional Tool Protection Plan:
                          </label>
                          <div className="protection-options-grid">
                            {PROTECTION_PLANS.map(plan => (
                              <div 
                                key={plan.id}
                                className={`protection-card ${selectedProtectionPlan === plan.id ? 'selected' : ''}`}
                                onClick={() => setSelectedProtectionPlan(plan.id)}
                              >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <span style={{ fontSize: '12px', fontWeight: '700' }}>{plan.name}</span>
                                  <span style={{ fontSize: '9px', fontWeight: '800', padding: '1px 5px', borderRadius: '4px', background: 'rgba(234, 179, 8, 0.2)', color: 'var(--accent)' }}>
                                    {plan.badge}
                                  </span>
                                </div>
                                <span style={{ fontSize: '11px', color: 'var(--primary-hover)', fontWeight: '600' }}>
                                  {plan.feePerDay === 0 ? 'FREE' : `+රු. ${plan.feePerDay}/day`}
                                </span>
                                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{plan.description}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {bookingStart && bookingEnd && isDateOverlapping(selectedTool.id, bookingStart, bookingEnd) && (
                          <div style={{ color: 'var(--danger)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <AlertTriangle size={14} /> Already booked on those dates.
                          </div>
                        )}

                        {bookingStart && bookingEnd && new Date(bookingStart) <= new Date(bookingEnd) && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: 'rgba(0,0,0,0.15)', padding: '12px', borderRadius: '8px' }}>
                            {(() => {
                              const days = calculateTotalDays(bookingStart, bookingEnd)
                              const baseRental = days * selectedTool.rate
                              const discountPct = getMultiDayDiscountPct(days)
                              const discountAmount = Math.round((baseRental * discountPct) / 100)
                              const rentalAfterDiscount = baseRental - discountAmount

                              const plan = PROTECTION_PLANS.find(p => p.id === selectedProtectionPlan) || PROTECTION_PLANS[0]
                              const protectionFee = plan.feePerDay * days

                              return (
                                <>
                                  <div className="calc-row">
                                    <span>Base Rental ({days} days)</span>
                                    <span>රු. {baseRental.toLocaleString()}</span>
                                  </div>
                                  
                                  {discountPct > 0 && (
                                    <div className="calc-row" style={{ color: '#34d399', fontWeight: '700' }}>
                                      <span>🔥 Multi-day Savings ({discountPct}% OFF)</span>
                                      <span>-රු. {discountAmount.toLocaleString()}</span>
                                    </div>
                                  )}

                                  {protectionFee > 0 && (
                                    <div className="calc-row" style={{ color: 'var(--accent)' }}>
                                      <span>Protection ({plan.name})</span>
                                      <span>+රු. {protectionFee.toLocaleString()}</span>
                                    </div>
                                  )}
                                  <div className="calc-row">
                                    <span>Refundable Security Deposit</span>
                                    <span>රු. {(selectedTool.deposit || 0).toLocaleString()}</span>
                                  </div>
                                  <div className="calc-total">
                                    <span>Authorized Total</span>
                                    <span>රු. {(rentalAfterDiscount + protectionFee + (selectedTool.deposit || 0)).toLocaleString()}</span>
                                  </div>
                                </>
                              )
                            })()}
                            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', marginTop: '4px' }}>
                              *Deposit is held securely and refunded immediately upon verified return.
                            </span>
                          </div>
                        )}

                        <button 
                          type="submit" 
                          className="primary-btn" 
                          style={{ width: '100%', justifyContent: 'center' }}
                          disabled={!bookingStart || !bookingEnd || new Date(bookingStart) > new Date(bookingEnd) || isDateOverlapping(selectedTool.id, bookingStart, bookingEnd)}
                        >
                          Send Booking Request
                        </button>
                      </form>
                    )}
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD / EDIT LISTING */}
      {isAddToolOpen && (
        <div className="modal-overlay" onClick={() => setIsAddToolOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editTool ? 'Edit Tool Listing' : 'List a New Tool'}</h2>
              <button className="modal-close-btn" onClick={() => setIsAddToolOpen(false)}>&times;</button>
            </div>
            
            <form onSubmit={editTool ? handleUpdateTool : handleAddTool}>
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group form-grid-full">
                    <label>Tool Title</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Cordless Hammer Drill 18V"
                      value={newToolForm.title}
                      onChange={(e) => setNewToolForm({ ...newToolForm, title: e.target.value })}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Category</label>
                    <select 
                      value={newToolForm.category}
                      onChange={(e) => setNewToolForm({ ...newToolForm, category: e.target.value })}
                    >
                      {CATEGORIES.filter(c => c !== 'All').map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* AI Pricing Button Assistant */}
                  <div className="form-grid-full" style={{ background: 'rgba(234, 179, 8, 0.08)', border: '1px dashed rgba(234, 179, 8, 0.3)', padding: '10px 14px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Sparkles size={16} style={{ color: 'var(--accent)' }} />
                      <span style={{ fontSize: '13px', fontWeight: '600' }}>AI Pricing Assistant</span>
                    </div>
                    <button 
                      type="button" 
                      className="secondary-btn"
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                      onClick={handleAiPricingAssist}
                    >
                      🤖 Auto-Calculate Price & Deposit
                    </button>
                  </div>

                  <div className="form-group">
                    <label>Daily Rental Rate (LKR)</label>
                    <input 
                      type="number" 
                      required
                      placeholder="e.g. 1500"
                      value={newToolForm.rate}
                      onChange={(e) => setNewToolForm({ ...newToolForm, rate: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Refundable Security Deposit (LKR)</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 5000"
                      value={newToolForm.deposit}
                      onChange={(e) => setNewToolForm({ ...newToolForm, deposit: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Pickup Location (City)</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Colombo 03, Maharagama"
                      value={newToolForm.location}
                      onChange={(e) => setNewToolForm({ ...newToolForm, location: e.target.value })}
                    />
                  </div>

                  <div className="form-group form-grid-full">
                    <label>Tool Description & Included Accessories</label>
                    <textarea 
                      rows="3"
                      required
                      placeholder="List power rating, brand, condition, and any extra items..."
                      value={newToolForm.description}
                      onChange={(e) => setNewToolForm({ ...newToolForm, description: e.target.value })}
                    ></textarea>
                  </div>

                  {/* Cloudinary simulation */}
                  <div className="form-group form-grid-full">
                    <label>Tool Image Upload</label>
                    <div className="upload-dropzone" onClick={triggerImageUpload}>
                      <Upload size={24} style={{ margin: '0 auto 8px auto', color: 'var(--text-muted)' }} />
                      {isUploading ? (
                        <span>Uploading to Cloudinary...</span>
                      ) : uploadedImagePreset ? (
                        <span style={{ color: 'var(--success)', fontWeight: '600' }}>✓ Image uploaded successfully!</span>
                      ) : (
                        <span>Drag & drop image here or click to simulate Cloudinary upload</span>
                      )}
                      
                      {isUploading && (
                        <div className="upload-progress-container">
                          <div className="upload-progress-bar">
                            <div className="upload-progress-fill" style={{ width: `${uploadProgress}%` }}></div>
                          </div>
                          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{uploadProgress}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="secondary-btn" onClick={() => setIsAddToolOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary-btn" disabled={isUploading}>
                  {editTool ? 'Save Changes' : 'List Tool'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: LEAVE REVIEW */}
      {isReviewOpen && reviewBooking && (
        <div className="modal-overlay" onClick={() => setIsReviewOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{reviewTarget === 'tool' ? 'Rate Tool & Owner' : 'Rate Renter Performance'}</h2>
              <button className="modal-close-btn" onClick={() => setIsReviewOpen(false)}>&times;</button>
            </div>
            
            <form onSubmit={handleSubmitReview}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p>
                  {reviewTarget === 'tool' 
                    ? `Please share your honest feedback about the tool quality and handover.` 
                    : `Provide feedback about how the renter handled your tool. Was it returned clean and on time?`
                  }
                </p>

                <div className="form-group">
                  <label>Rating</label>
                  <div className="rating-selector">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        type="button" 
                        key={star}
                        className={`rating-star-btn ${reviewForm.rating >= star ? 'active' : ''}`}
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      >
                        <Star size={30} fill={reviewForm.rating >= star ? 'var(--accent)' : 'none'} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Comment / Review</label>
                  <textarea 
                    rows="3"
                    required
                    placeholder="Describe your experience..."
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="secondary-btn" onClick={() => setIsReviewOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary-btn">
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: QR CODE SCANNING SIMULATOR */}
      {qrScanBooking && (
        <div className="modal-overlay" onClick={() => setQrScanBooking(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px' }}>
            <div className="modal-header">
              <h2>QR Handover Verification</h2>
              <button className="modal-close-btn" onClick={() => setQrScanBooking(null)}>&times;</button>
            </div>

            <div className="modal-body" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              <p style={{ fontSize: '14px' }}>
                {qrScanType === 'pickup' 
                  ? 'Scan the Owner\'s QR Code to verify handover & activate booking.' 
                  : 'Scan the QR Code to verify tool return receipt & trigger deposit refund.'
                }
              </p>

              <div style={{ 
                position: 'relative', 
                width: '200px', 
                height: '200px', 
                background: 'white', 
                padding: '16px', 
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                {isScanningStatus === 'scanning' && (
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: '#10b981',
                    boxShadow: '0 0 10px #10b981',
                    top: '0%',
                    animation: 'radarPulse 1.8s infinite linear',
                    transformOrigin: 'top'
                  }}></div>
                )}

                <svg width="150" height="150" viewBox="0 0 29 29" style={{ fill: '#0f172a' }}>
                  <path d="M0 0h9v9H0zm1 1v7h7V1zm8 0h3v1h1v1h-1v1h1v1h-2v1h-2zm4 0h3v1h1v2h-1v1h-1v1h-1v1h-1v-2h2v-1h-2zm4 0h9v9h-9zm1 1v7h7V1zm-9 7h1v1h-1zm1 0h1v1h-1zm4 1v1h1v1h-2v1h-1v-1h-1v-2zm-12 2h1v1H0zm2 0h1v1H2zm2 0h1v2H4zm2 0h2v1H6zm4 0h2v1h-2zm4 0h1v1h-1zm2 0h1v2h-1v1h-1v-1h-1v-1h1zm4 0h1v1h-1zm2 0h1v1h-1zm-18 2h1v1H2zm4 0h1v1H6zm2 0h1v1H8zm4 0h1v1h-1zm4 0h2v1h-2zm3 0h1v1h-1zm3 0h2v1h-2zm-18 2h1v1H0zm4 0h1v1H4zm6 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm4 0h1v1h-1zm3 0h1v2h-1zm1 0h1v1h-1zm-17 2h1v1H2zm2 0h2v1H4zm4 0h2v1H8zm4 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-14 2H0v9h9v-9zm1 1v7h7v-7zm1 0h1v1h-1zm2 0h2v1h-2zm3 0h1v1h-1zm3 0h1v1h-1zm3 0h1v2h-1zm-10 2h1v1h-1zm2 0h1v1h-1zm3 0h1v1h-1zm3 0h1v1h-1zm1 0h1v1h-1zm-9 2h1v1h-1zm2 0h2v1h-2zm4 0h1v1h-1zm4 0h1v1h-1z"/>
                </svg>
              </div>

              <div style={{ minHeight: '30px' }}>
                {isScanningStatus === 'idle' && (
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Ready to verify</span>
                )}
                {isScanningStatus === 'scanning' && (
                  <span style={{ fontSize: '13px', color: 'var(--primary-hover)', fontWeight: '600' }} className="animate-pulse">
                    Scanning secure code...
                  </span>
                )}
                {isScanningStatus === 'success' && (
                  <span style={{ fontSize: '13px', color: 'var(--success)', fontWeight: '700' }}>
                    ✓ QR Verified! Handover Authenticated.
                  </span>
                )}
              </div>
            </div>

            <div className="modal-footer" style={{ justifyContent: 'center' }}>
              <button 
                type="button" 
                className="secondary-btn" 
                onClick={() => setQrScanBooking(null)}
                disabled={isScanningStatus === 'scanning'}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="primary-btn" 
                onClick={simulateQrScan}
                disabled={isScanningStatus !== 'idle'}
              >
                Start Scanning
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: SIDE-BY-SIDE TOOL COMPARISON */}
      {isCompareOpen && (
        <div className="modal-overlay" onClick={() => setIsCompareOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px' }}>
            <div className="modal-header">
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Scale style={{ color: 'var(--primary)' }} /> Tool Specs Comparison
              </h2>
              <button className="modal-close-btn" onClick={() => setIsCompareOpen(false)}>&times;</button>
            </div>

            <div className="modal-body">
              <div className="comparison-table-wrapper">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th>Specification</th>
                      {compareToolIds.map(id => {
                        const t = tools.find(x => x.id === id)
                        return <th key={id} style={{ color: 'var(--text-primary)', fontSize: '15px' }}>{t?.title}</th>
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Category</th>
                      {compareToolIds.map(id => {
                        const t = tools.find(x => x.id === id)
                        return <td key={id}>{t?.category}</td>
                      })}
                    </tr>
                    <tr>
                      <th>Daily Rental Rate</th>
                      {compareToolIds.map(id => {
                        const t = tools.find(x => x.id === id)
                        return <td key={id} style={{ fontWeight: '800', color: '#34d399' }}>රු. {t?.rate.toLocaleString()}/day</td>
                      })}
                    </tr>
                    <tr>
                      <th>Refundable Deposit</th>
                      {compareToolIds.map(id => {
                        const t = tools.find(x => x.id === id)
                        return <td key={id} style={{ color: 'var(--accent)', fontWeight: '600' }}>රු. {t?.deposit.toLocaleString()}</td>
                      })}
                    </tr>
                    <tr>
                      <th>Pickup City</th>
                      {compareToolIds.map(id => {
                        const t = tools.find(x => x.id === id)
                        return <td key={id}>{t?.location}</td>
                      })}
                    </tr>
                    <tr>
                      <th>Community Rating</th>
                      {compareToolIds.map(id => {
                        const t = tools.find(x => x.id === id)
                        return <td key={id}>⭐ {t?.rating} ({t?.reviews.length} reviews)</td>
                      })}
                    </tr>
                    <tr>
                      <th>Health Certification</th>
                      {compareToolIds.map(id => {
                        const t = tools.find(x => x.id === id)
                        return <td key={id} style={{ color: '#34d399', fontSize: '12px' }}>✓ {t?.health?.motor || '100% Verified'}</td>
                      })}
                    </tr>
                    <tr>
                      <th>Action</th>
                      {compareToolIds.map(id => {
                        const t = tools.find(x => x.id === id)
                        return (
                          <td key={id}>
                            <button 
                              className="primary-btn" 
                              style={{ padding: '6px 12px', fontSize: '12px' }}
                              onClick={() => {
                                setIsCompareOpen(false)
                                setSelectedTool(t)
                              }}
                            >
                              Book This Tool
                            </button>
                          </td>
                        )
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="modal-footer">
              <button className="secondary-btn" onClick={() => setIsCompareOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 6: DIGITAL AGREEMENT & PRINTABLE INVOICE RECEIPT */}
      {invoiceBooking && (
        <div className="modal-overlay" onClick={() => setInvoiceBooking(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '750px', background: '#ffffff', color: '#0f172a' }}>
            <div className="modal-header" style={{ borderBottom: '1px solid #e2e8f0' }}>
              <h2 style={{ color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileCheck style={{ color: '#10b981' }} /> Digital Rental Agreement & Receipt
              </h2>
              <button className="modal-close-btn" style={{ color: '#0f172a' }} onClick={() => setInvoiceBooking(null)}>&times;</button>
            </div>

            <div className="modal-body">
              {(() => {
                const tool = tools.find(t => t.id === invoiceBooking.toolId) || { title: 'Tool', rate: 0 }
                const renter = users.find(u => u.id === invoiceBooking.renterId) || { name: 'Renter', nic: 'Verified', phone: '0770000000' }
                const lender = users.find(u => u.id === invoiceBooking.lenderId) || { name: 'Lender', nic: 'Verified', phone: '0710000000' }

                return (
                  <div className="invoice-document" id="printable-contract">
                    <div className="invoice-header">
                      <div>
                        <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a' }}>Rent-a-Tool Lk</h1>
                        <p style={{ fontSize: '12px', color: '#64748b' }}>Peer-to-Peer Rental Contract Agreement</p>
                      </div>
                      <div className="invoice-stamp">
                        <ShieldCheck size={16} /> Verified Contract #{invoiceBooking.id}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px', fontSize: '13px' }}>
                      <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>
                        <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Renter Party:</div>
                        <div style={{ fontWeight: '700', fontSize: '14px', marginTop: '2px' }}>{renter.name}</div>
                        <div>Phone: {renter.phone}</div>
                        <div>NIC: {renter.nic || 'Verified Renter'}</div>
                      </div>

                      <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>
                        <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Lender Party:</div>
                        <div style={{ fontWeight: '700', fontSize: '14px', marginTop: '2px' }}>{lender.name}</div>
                        <div>Phone: {lender.phone}</div>
                        <div>Location: {tool.location}</div>
                      </div>
                    </div>

                    <table className="invoice-table">
                      <thead>
                        <tr>
                          <th>Description</th>
                          <th>Duration / Plan</th>
                          <th>Amount (LKR)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>{tool.title}</strong> Daily Rental Rate</td>
                          <td>{invoiceBooking.startDate} to {invoiceBooking.endDate}</td>
                          <td>රු. {invoiceBooking.totalPrice.toLocaleString()}</td>
                        </tr>
                        {invoiceBooking.discountAmount > 0 && (
                          <tr style={{ color: '#047857', fontWeight: '600' }}>
                            <td>🔥 Multi-day Discount Applied</td>
                            <td>Special Offer</td>
                            <td>-රු. {invoiceBooking.discountAmount.toLocaleString()}</td>
                          </tr>
                        )}
                        {invoiceBooking.protectionPlan && (
                          <tr>
                            <td>Tool Protection ({invoiceBooking.protectionPlan})</td>
                            <td>Coverage Active</td>
                            <td>Included</td>
                          </tr>
                        )}
                        <tr style={{ background: '#f8fafc', fontWeight: '800' }}>
                          <td>Refundable Security Deposit Authorized</td>
                          <td>Refunded on Return</td>
                          <td>රු. {(invoiceBooking.depositPrice || 0).toLocaleString()}</td>
                        </tr>
                      </tbody>
                    </table>

                    <div style={{ borderTop: '2px dashed #cbd5e1', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>
                        Digitally signed & authenticated via Rent-a-Tool LK Security Protocol.
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Total Authorized</div>
                        <div style={{ fontSize: '20px', fontWeight: '800', color: '#047857' }}>
                          රු. {(invoiceBooking.totalPrice + (invoiceBooking.depositPrice || 0)).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>

            <div className="modal-footer" style={{ borderTop: '1px solid #e2e8f0' }}>
              <button className="secondary-btn" style={{ color: '#0f172a' }} onClick={() => setInvoiceBooking(null)}>
                Close
              </button>
              <button 
                className="primary-btn"
                onClick={() => window.print()}
              >
                <Printer size={16} /> Print / Save PDF Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════ FLOATING AI TOOL ADVISOR BOT ════════ */}
      {/* Floating toggle button */}
      <button
        id="ai-bot-toggle-btn"
        className="ai-bot-fab"
        onClick={() => setIsBotOpen(prev => !prev)}
        title="AI Tool Advisor"
      >
        {isBotOpen ? <XCircle size={26} /> : <Bot size={26} />}
        {!isBotOpen && (
          <span className="ai-bot-fab-label">AI Advisor</span>
        )}
      </button>

      {/* Bot Chat Panel */}
      {isBotOpen && (
        <div className="ai-bot-panel glass-panel animate-fade">
          <div className="ai-bot-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="ai-bot-avatar">
                <Bot size={18} />
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '14px' }}>Gemini Tool Advisor</div>
                <div style={{ fontSize: '11px', color: geminiApiKey ? '#34d399' : '#f87171' }}>
                  {geminiApiKey ? '● Live AI Connected' : '● No API Key — add one!'}
                </div>
              </div>
            </div>
            <button
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}
              onClick={() => setIsBotOpen(false)}
            >
              <XCircle size={18} />
            </button>
          </div>

          <div className="ai-bot-messages">
            {botMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`ai-bot-bubble ${msg.role}`}
              >
                {msg.role === 'bot' && (
                  <div className="ai-bot-bubble-avatar"><Bot size={12} /></div>
                )}
                <div className="ai-bot-bubble-text">{msg.text}</div>
              </div>
            ))}
            {botThinking && (
              <div className="ai-bot-bubble bot">
                <div className="ai-bot-bubble-avatar"><Bot size={12} /></div>
                <div className="ai-bot-bubble-text ai-bot-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={botEndRef} />
          </div>

          <form
            className="ai-bot-input-row"
            onSubmit={(e) => { e.preventDefault(); handleBotSend() }}
          >
            <input
              className="search-input"
              style={{ border: 'none', background: 'transparent', fontSize: '13px', flex: 1 }}
              placeholder={geminiApiKey ? 'Ask me which tool you need...' : 'Add API key first...'}
              value={botInput}
              onChange={(e) => setBotInput(e.target.value)}
              disabled={botThinking}
            />
            <button
              type="submit"
              className="primary-btn"
              style={{ padding: '8px 14px', flexShrink: 0, fontSize: '13px' }}
              disabled={botThinking || !botInput.trim()}
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

        {/* VIEW 5: ADMIN PANEL */}
        {currentView === 'admin' && currentUser?.role === 'admin' && (
          <div className="dashboard-layout">
            <h2 style={{ fontSize:'24px', fontWeight:'700', marginBottom:'20px', display:'flex', alignItems:'center', gap:'10px', color:'var(--text-primary)' }}>
              <ShieldCheck size={28} style={{ color:'var(--accent)' }} /> Admin Dashboard
            </h2>
            <div className="dashboard-grid">
              <div className="glass-panel" style={{ padding:'24px', borderRadius:'16px' }}>
                <h3 style={{ marginBottom:'16px', color:'var(--text-primary)' }}>System Users ({users.length})</h3>
                <div style={{ maxHeight:'400px', overflowY:'auto' }}>
                  {users.map(u => (
                    <div key={u.id} style={{ padding:'12px', borderBottom:'1px solid var(--border-color)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                        <div className="user-avatar">{u.avatar}</div>
                        <div>
                          <div style={{ fontWeight:'600', color:'var(--text-primary)' }}>
                            {u.name} 
                            {u.role==='admin' && <span style={{fontSize:'10px', background:'var(--accent)', color:'black', padding:'2px 6px', borderRadius:'10px', marginLeft:'8px', fontWeight:'bold'}}>ADMIN</span>}
                          </div>
                          <div style={{ fontSize:'12px', color:'var(--text-muted)' }}>{u.email} | {u.phone}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-panel" style={{ padding:'24px', borderRadius:'16px' }}>
                <h3 style={{ marginBottom:'16px', color:'var(--text-primary)' }}>All Tools ({tools.length})</h3>
                <div style={{ maxHeight:'400px', overflowY:'auto' }}>
                  {tools.map(t => (
                    <div key={t.id} style={{ padding:'12px', borderBottom:'1px solid var(--border-color)' }}>
                      <div style={{ fontWeight:'600', color:'var(--text-primary)' }}>{t.title}</div>
                      <div style={{ fontSize:'12px', color:'var(--text-muted)' }}>{t.category} | රු. {t.rate}/day | Location: {t.location}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      {/* ════════ API KEY SETUP MODAL ════════ */}
      {isApiKeyModalOpen && (
        <div className="modal-overlay" onClick={() => setIsApiKeyModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Sparkles size={20} style={{ color: 'var(--accent)' }} /> Gemini AI Setup
              </h2>
              <button className="modal-close-btn" onClick={() => setIsApiKeyModalOpen(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                  🔑 Get your <strong>free</strong> Gemini API key from{' '}
                  <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>aistudio.google.com</a>.
                  Once added, the AI Advisor and Chat Bot will use real Gemini intelligence to recommend tools for your project!
                </p>
              </div>

              <label className="form-label">Your Gemini API Key</label>
              <input
                type="password"
                className="form-input"
                placeholder="AIza..."
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                style={{ marginBottom: '8px' }}
              />
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '0 0 20px' }}>
                Your key is stored locally in your browser only and never sent to our servers.
              </p>

              {geminiApiKey && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontSize: '13px', marginBottom: '12px' }}>
                  <CheckCircle size={15} /> API key is currently active
                </div>
              )}
            </div>
            <div className="modal-footer">
              {geminiApiKey && (
                <button
                  className="danger-btn"
                  onClick={() => { setGeminiApiKey(''); setApiKeyInput(''); setIsApiKeyModalOpen(false); showToast('API key removed.', 'warning') }}
                >
                  Remove Key
                </button>
              )}
              <button className="secondary-btn" onClick={() => setIsApiKeyModalOpen(false)}>Cancel</button>
              <button
                className="primary-btn"
                onClick={() => {
                  setGeminiApiKey(apiKeyInput.trim())
                  setIsApiKeyModalOpen(false)
                  showToast('🤖 Gemini API key saved! AI is now live.', 'success')
                }}
                disabled={!apiKeyInput.trim()}
              >
                <Zap size={15} /> Save & Activate
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default App
