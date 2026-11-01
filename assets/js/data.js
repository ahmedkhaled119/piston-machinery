// Demo data — in the real system all of this comes from the Admin Portal.
window.PISTON_DATA = {
  settings: {
    company: "Piston Machinery",
    tagline: "Leading manufacturer of professional woodworking machinery built for precision, durability and industrial performance.",
    address: "Industrial Area, 6th of October City, Giza, Egypt",
    phone: "+20 123 456 7890",
    salesEmail: "sales@piston-machinery.com",
    infoEmail: "info@piston-machinery.com",
    website: "www.piston-machinery.com",
    whatsapp: { sales: "201234567890", parts: "201234567891", support: "201234567892" },
    whatsappDisplay: { sales: "+20 123 456 7890", parts: "+20 123 456 7891", support: "+20 123 456 7892" },
    stats: [
      { value: "25+", label: "Years of Experience", note: "Delivering reliable solutions since 1998" },
      { value: "1,200+", label: "Machines Installed", note: "Across more than 60 countries worldwide" },
      { value: "98%", label: "Customer Satisfaction", note: "Trusted by professionals around the world" },
      { value: "24/7", label: "Technical Support", note: "We are here whenever you need us" }
    ],
    statsExtra: [
      { value: "100+", label: "Projects Delivered" },
      { value: "100+", label: "Distributors" },
      { value: "30,000 m²", label: "Manufacturing Facility" },
      { value: "24/7", label: "Technical Support" }
    ],
    // "Piston by the Numbers" band on About (values as in mockup 06.37.47).
    statsAbout: [
      { value: "20+", label: "Years\nof Experience" },
      { value: "50+", label: "Countries\nWorldwide" },
      { value: "10,000+", label: "Machines\nDelivered" },
      { value: "250+", label: "Skilled\nEmployees" },
      { value: "30,000 m²", label: "Production\nFacility" },
      { value: "24/7", label: "Global Support\nAvailable" }
    ],
    statsPresence: [
      { value: "50+", label: "Countries" },
      { value: "5", label: "Continents" },
      { value: "100+", label: "Distributors" },
      { value: "10000+", label: "Machines Installed" }
    ],
    hours: [
      { channel: "Sales", days: "Sunday – Thursday", time: "08:00 AM – 06:00 PM", tz: "GMT+2", closed: "Friday & Saturday" },
      { channel: "Technical Support", days: "Sunday – Thursday", time: "08:00 – 18:00", tz: "Cairo (EET)", closed: "Friday & Saturday" },
      { channel: "Spare Parts", days: "Sunday – Thursday", time: "08:00 – 17:00", tz: "Cairo (EET)", closed: "Friday & Saturday" }
    ]
  },

  categories: [
    { id: "saws", name: "Sliding Table Saws", desc: "High-precision cutting for panel sizing", kind: "saw" },
    { id: "edge", name: "Edge Banding Machines", desc: "Perfect finishing for every panel edge", kind: "edge" },
    { id: "press", name: "Vacuum Presses", desc: "Membrane pressing for doors, panels and 3D surfaces", kind: "press" },
    { id: "drill", name: "Drilling Machines", desc: "Multi-spindle boring for hardware and assembly", kind: "drill" },
    { id: "other", name: "Other Machinery", desc: "Panel saws, CNC, handling and line control", kind: "other" }
  ],

  products: [
    { id: "r32", model: "PISTON R32", name: "Sliding Table Saw", cat: "saws", kind: "saw", featured: true, power: 5.5, availability: "In Stock",
      desc: "High precision cutting for all panel sizing applications.",
      key: ["5.5 kW", "3200 mm", "Ø 400 mm"],
      specs: [["Max Cutting Length", "3200 mm"], ["Max Cutting Width", "1250 mm"], ["Saw Blade Diameter", "Ø 400 mm"], ["Saw Blade Bore Diameter", "Ø 30 mm"], ["Saw Blade Tilting", "0° – 45°"], ["Max Cutting Height (90°)", "120 mm"], ["Max Cutting Height (45°)", "85 mm"],
        ["Main Motor Power", "5.5 kW (7.5 HP)"], ["Scoring Motor Power", "0.75 kW (1 HP)"], ["Sliding Table Size", "3200 x 375 mm"], ["Main Table Size", "800 x 550 mm"], ["Extension Table Size", "800 x 550 mm"], ["Dust Outlet Diameter", "Ø 120 mm"], ["Machine Dimensions (LxWxH)", "3200 x 2100 x 900 mm"], ["Net Weight", "750 kg"]],
      strip: [["5.5 kW", "Main Motor Power"], ["3200 mm", "Max Cutting Length"], ["Ø 400 mm", "Blade Diameter"], ["3200 x 375 mm", "Table Dimensions"], ["90° – 45°", "Cutting Angle"], ["750 kg", "Net Weight"]],
      longDesc: "High-precision sliding table saw designed for panel sizing with exceptional accuracy, stability and heavy-duty industrial performance.",
      overview: ["The PISTON R32 Sliding Table Saw is built for professional woodworking operations that require precision, reliability, and long-term durability.",
        "Its heavy-duty structure, high-performance motor and advanced sliding system ensure perfect cutting results for panel sizing, furniture manufacturing, and shop production.",
        "Ideal for MDF, plywood, particle board, solid wood and more."],
      features: ["Heavy-duty cast iron main table for maximum stability and vibration-free operation.", "Precision sliding system for smooth movement and high cutting accuracy.",
        "Tilting saw blade 0° – 45° for bevel cutting.", "Powerful main motor for continuous industrial use.", "High-quality blade for clean and precise cuts.",
        "Ergonomic control panel for easy operation.", "Safety protection hood and anti-kickback system.", "Dust collection outlet for a clean working environment."],
      apps: ["Furniture Manufacturing", "Cabinet Production", "Interior Woodworking", "Door Manufacturing", "Panel Sizing", "Custom Wood Projects"],
      industries: ["furniture", "cabinet", "door", "interior", "workshops"] },
    { id: "r42", model: "PISTON R42", name: "Sliding Table Saw", cat: "saws", kind: "saw", power: 7.5, availability: "Made to Order",
      desc: "Heavy duty sliding table saw with higher cutting capacity.",
      key: ["7.5 kW", "4200 mm", "Ø 450 mm"],
      specs: [["Max Cutting Length", "3800 mm"], ["Max Cutting Width", "1450 mm"], ["Main Saw Blade", "Ø 450 mm"], ["Main Motor", "7.5 kW"], ["Net Weight", "980 kg"]],
      industries: ["furniture", "cabinet", "industrial"] },
    { id: "pj1300", model: "PJ 1300", name: "Panel Saw", cat: "other", kind: "saw", power: 5.5, availability: "In Stock",
      desc: "Reliable panel cutting with strong sawing performance.",
      key: ["5.5 kW", "1300 mm", "Ø 300 mm"],
      specs: [["Max Cutting Length", "1300 mm"], ["Main Motor", "4 kW"], ["Net Weight", "420 kg"]],
      industries: ["workshops", "interior"] },
    { id: "peb368", model: "PEB 368", name: "Edge Banding Machine", cat: "edge", kind: "edge", featured: true, power: 11, availability: "In Stock",
      desc: "Perfect edge finishing for professional woodworking.",
      key: ["11 kW", "0.4 – 3 mm", "20 m/min"],
      specs: [["Edge Thickness", "0.4 – 3 mm"], ["Panel Thickness", "10 – 60 mm"], ["Feed Speed", "12 – 20 m/min"], ["Total Power", "9.5 kW"], ["Net Weight", "1,850 kg"]],
      industries: ["furniture", "cabinet", "door", "interior"] },
    { id: "peb468", model: "PEB 468", name: "Edge Banding Machine", cat: "edge", kind: "edge", power: 13, availability: "Made to Order",
      desc: "Advanced edge banding with glue scraping and polishing.",
      key: ["13 kW", "0.4 – 3 mm", "18 m/min"],
      specs: [["Edge Thickness", "0.4 – 3 mm"], ["Feed Speed", "16 – 23 m/min"], ["Total Power", "12 kW"]],
      industries: ["furniture", "cabinet", "industrial"] },
    { id: "peb580", model: "PEB 580", name: "Edge Banding Machine", cat: "edge", kind: "edge", power: 15, availability: "Made to Order",
      desc: "Full automatic edge banding for industrial production.",
      key: ["15 kW", "0.4 – 3 mm", "20 m/min"],
      specs: [["Edge Thickness", "0.4 – 3 mm"], ["Feed Speed", "18 – 25 m/min"], ["Total Power", "16 kW"]],
      industries: ["industrial", "cabinet"] },
    { id: "pvpm2500", model: "PVPM 2500", name: "Vacuum Membrane Press", cat: "press", kind: "press", featured: true, power: 7.5, availability: "In Stock",
      desc: "High performance presses for doors, panels and 3D surfaces.",
      key: ["7.5 kW", "2500 x 1300 mm", "-0.95 bar"],
      specs: [["Working Area", "2500 × 1300 mm"], ["Max Workpiece Height", "60 mm"], ["Total Power", "7.5 kW"], ["Net Weight", "1,600 kg"]],
      industries: ["furniture", "cabinet", "door", "interior"] },
    { id: "pvpm3000", model: "PVPM 3000", name: "Vacuum Membrane Press", cat: "press", kind: "press", power: 9, availability: "Made to Order",
      desc: "Large working area for high volume membrane pressing.",
      key: ["9 kW", "3000 x 1300 mm", "-0.95 bar"],
      specs: [["Working Area", "3000 × 1500 mm"], ["Total Power", "11 kW"]],
      industries: ["door", "industrial"] },
    { id: "pbd21", model: "PBD 21", name: "Multi Boring Machine", cat: "drill", kind: "drill", featured: true, power: 3, availability: "In Stock",
      desc: "High efficiency drilling for furniture production.",
      key: ["3 kW", "21 Spindles", "35 mm"],
      specs: [["Spindles", "21"], ["Spindle Distance", "32 mm"], ["Max Drilling Depth", "60 mm"], ["Total Power", "4.5 kW"]],
      industries: ["furniture", "cabinet", "door", "interior", "workshops"] },
    { id: "pbd29", model: "PBD 29", name: "Multi Boring Machine", cat: "drill", kind: "drill", power: 4, availability: "In Stock",
      desc: "Multiple drilling heads for maximum productivity.",
      key: ["4 kW", "29 Spindles", "35 mm"],
      specs: [["Spindles", "29"], ["Total Power", "6 kW"]],
      industries: ["cabinet", "furniture"] },
    { id: "pbd42", model: "PBD 42", name: "Multi Boring Machine", cat: "drill", kind: "drill", power: 5.5, availability: "Made to Order",
      desc: "High performance multi boring for mass production.",
      key: ["5.5 kW", "42 Spindles", "35 mm"],
      specs: [["Spindles", "42"], ["Total Power", "9 kW"]],
      industries: ["industrial", "cabinet"] },
    { id: "cnc2500", model: "CNC 2500", name: "CNC Router", cat: "other", kind: "drill", power: 15, availability: "Made to Order",
      desc: "Nesting CNC router for cutting, routing and drilling in one cycle.",
      key: ["15 kW", "2500 × 1300 mm", "Auto tool change"],
      specs: [["Working Area", "2500 × 1300 mm"], ["Spindle", "15 kW HSD"], ["Tool Changer", "12 positions"]],
      industries: ["interior", "industrial", "door"] },
    { id: "stacker", model: "Stacker", name: "Auto Stacker", cat: "other", kind: "other", power: 3, availability: "Made to Order",
      desc: "Efficient automatic stacking and material handling for production lines.",
      key: ["3 kW", "Auto stacking", "Line integration"],
      specs: [["Max Load", "3,000 kg"], ["Total Power", "3 kW"]],
      industries: ["industrial"] },
    { id: "slc", model: "Smart Line Control", name: "Line Control System", cat: "other", kind: "other", power: 0.5, availability: "Made to Order",
      desc: "Real-time monitoring and intelligent process control across the production line.",
      key: ["Real-time", "Dashboards", "Alerts"],
      specs: [["Connectivity", "Ethernet / OPC-UA"], ["Interface", "Web dashboard"]],
      industries: ["industrial", "cabinet"] }
  ],

  components: {
    r32: [
      { n: "01", name: "Main Assembly", desc: "Robust steel and cast-iron construction for maximum stability and accuracy.", specs: [["Frame", "Steel, high rigidity"], ["Trunnion", "Cast iron"]], x: 50, y: 52 },
      { n: "02", name: "Main Motor", desc: "High-performance motor delivering powerful, consistent performance for heavy-duty operations.", specs: [["Power", "5.5 kW (7.5 HP)"], ["Voltage", "380V / 50Hz / 3Ph"], ["Speed", "2880 RPM"], ["Protection", "IP55"], ["Cooling", "Air cooled"]], x: 42, y: 70 },
      { n: "03", name: "Saw Blade", desc: "Precision TCT blade for clean and accurate cuts.", specs: [["Diameter", "Ø 400 mm"], ["Bore", "Ø 30 mm"], ["Type", "TCT"]], x: 47, y: 38 },
      { n: "04", name: "Sliding Table", desc: "Smooth and precise sliding table with bearing system.", specs: [["Length", "3200 mm"], ["Material", "Aluminium"], ["Bearings", "Sealed"]], x: 25, y: 44 },
      { n: "05", name: "Rip Fence", desc: "Precision rip fence with micro-adjustment.", specs: [["Cutting Width", "1250 mm"], ["Adjustment", "Micro-fine"], ["Display", "Digital"]], x: 70, y: 40 },
      { n: "06", name: "Control Panel", desc: "Ergonomic control panel for easy operation.", specs: [["Controls", "Start / Stop / E-stop"], ["Display", "Digital tilt & height"]], x: 80, y: 58 },
      { n: "07", name: "Dust Extraction Port", desc: "Efficient dust extraction for a clean workspace.", specs: [["Diameter", "Ø 120 mm"], ["Ports", "Dual"], ["Hose", "Flexible"]], x: 58, y: 78 },
      { n: "08", name: "Safety Guard", desc: "Transparent safety guard for maximum protection.", specs: [["Material", "Polycarbonate"], ["Standard", "CE safety"]], x: 52, y: 26 },
      { n: "09", name: "Scoring Unit", desc: "Independent scoring unit for a chip-free finish.", specs: [["Diameter", "Ø 120 mm"], ["Motor", "0.75 kW"], ["Adjustment", "Up / down"]], x: 36, y: 56 }
    ]
  },

  parts: {
    r32: {
      components: ["Main Assembly", "Main Motor", "Saw Blade", "Sliding Table", "Rip Fence", "Control Panel", "Dust Extraction", "Safety Guard", "Scoring Unit", "Electrical Box", "Rail System", "Pneumatic System"],
      list: {
        "Main Motor": [
          { pn: "PM-R32-001", name: "Main Motor 5.5 kW", desc: "5.5 kW / 380V / 50Hz / 3 Phase", stock: "In Stock", warranty: "12 months", compat: "R32, R32 Pro", weight: "38 kg" },
          { pn: "PM-R32-002", name: "Motor Bearing (DE)", desc: "6205ZZ drive-end bearing", stock: "In Stock", warranty: "12 months", compat: "R32, R32 Pro, R42", weight: "0.2 kg" },
          { pn: "PM-R32-003", name: "Motor Bearing (NDE)", desc: "6204ZZ non-drive-end bearing", stock: "In Stock", warranty: "12 months", compat: "R32, R32 Pro", weight: "0.2 kg" },
          { pn: "PM-R32-004", name: "Drive Belt", desc: "Poly-V belt for main spindle", stock: "In Stock", warranty: "6 months", compat: "R32", weight: "0.3 kg" },
          { pn: "PM-R32-005", name: "Motor Pulley", desc: "Aluminium pulley Ø 90 mm", stock: "Low Stock", warranty: "12 months", compat: "R32, R42", weight: "0.8 kg" },
          { pn: "PM-R32-006", name: "Cooling Fan", desc: "Motor cooling fan with cover", stock: "In Stock", warranty: "12 months", compat: "R32", weight: "0.4 kg" }
        ],
        "Saw Blade": [
          { pn: "SB-R32-001", name: "Main Saw Blade Ø400", desc: "TCT 60 teeth, bore Ø30", stock: "In Stock", warranty: "—", compat: "R32, R42", weight: "2.1 kg" },
          { pn: "SB-R32-002", name: "Scoring Blade Ø120", desc: "Conical scoring blade", stock: "In Stock", warranty: "—", compat: "R32", weight: "0.4 kg" },
          { pn: "SB-R32-003", name: "Blade Flange Set", desc: "Front & rear flange", stock: "In Stock", warranty: "12 months", compat: "R32", weight: "0.9 kg" }
        ]
      }
    }
  },

  industries: [
    { slug: "furniture", name: "Furniture Manufacturing", solutions: 24, installs: "1,250+", photo: "wood",
      intro: "Complete production solutions for modern furniture manufacturers — improve efficiency, reduce waste and deliver exceptional quality.",
      process: ["Panel Cutting", "Edge Banding", "Drilling", "Pressing", "Assembly", "Finishing"],
      solution: ["r32", "peb368", "pvpm2500", "pbd21"],
      benefits: [["+28%", "Increase in Production Capacity"], ["-18%", "Reduction in Material Waste"], ["+35%", "Improvement in Overall Efficiency"], ["High", "Quality & Consistency"]],
      apps: ["Residential Furniture", "Office Furniture", "Wardrobes", "Beds & Bedroom Sets", "Tables & Desks", "Custom Furniture"] },
    { slug: "cabinet", name: "Cabinet Manufacturing", solutions: 18, installs: "980+", photo: "warm",
      intro: "From precise cutting to perfect finishing, Piston provides integrated solutions that help cabinet manufacturers achieve higher quality, greater efficiency and lower costs.",
      process: ["Panel Cutting", "Edge Banding", "Drilling", "Assembly", "Quality Control", "Packing"],
      solution: ["r32", "peb368", "pbd21", "pvpm2500"],
      benefits: [["+25%", "Increase in Production Capacity"], ["-20%", "Reduction in Material Waste"], ["+30%", "Improvement in Efficiency"], ["High", "Perfect Finishing & Accuracy"]],
      apps: ["Kitchen Cabinets", "Wardrobes", "Office Furniture", "Bathroom Cabinets", "Storage Solutions", "Custom Cabinets"] },
    { slug: "door", name: "Door Manufacturing", solutions: 16, installs: "750+", photo: "steel",
      intro: "From raw panel processing to finishing, Piston provides integrated solutions for high-quality door manufacturing with precision, efficiency and reliability.",
      process: ["Panel Cutting", "Edge Banding", "Grooving", "Pressing", "Drilling", "Finishing"],
      solution: ["r32", "peb368", "pvpm2500", "pbd21"],
      benefits: [["+30%", "Increase in Capacity"], ["-20%", "Reduction in Material Waste"], ["+25%", "Improvement in Efficiency"], ["High", "Consistency — Perfect Doors Every Time"]],
      apps: ["Interior Doors", "Exterior Doors", "Engineered Doors", "Fire-Rated Doors", "Sliding Doors", "Custom Doors"] },
    { slug: "interior", name: "Interior Production", solutions: 15, installs: "640+", photo: "redish",
      intro: "From panels to perfect interiors, Piston delivers integrated solutions for kitchens, wardrobes, wall panels, office furniture and custom interior applications.",
      process: ["Panel Cutting", "CNC Routing", "Edge Banding", "Pressing", "Drilling", "Assembly"],
      solution: ["r32", "cnc2500", "peb368", "pvpm2500", "pbd21"],
      benefits: [["+28%", "Increase in Capacity"], ["-18%", "Reduction in Material Waste"], ["+30%", "Improvement in Efficiency"], ["High", "Quality — Perfect Every Detail"]],
      apps: ["Wall Panels", "Kitchens", "Wardrobes", "Office Fit-out", "Hospitality Interiors", "Architectural Woodwork"] },
    { slug: "workshops", name: "Woodworking Workshops", solutions: 18, installs: "2,100+", photo: "wood",
      intro: "Empower your workshop with reliable, precise and easy-to-use machinery. Piston solutions help woodworking professionals work smarter, produce better and grow their business.",
      process: ["Cutting", "Planing", "Thicknessing", "Drilling", "Edge Finishing", "Assembly"],
      solution: ["pj1300", "r32", "pbd21"],
      benefits: [["+25%", "Increase in Productivity"], ["-20%", "Reduction in Material Waste"], ["+30%", "Improvement in Efficiency"], ["High", "Reliability — Built to Work Every Day"]],
      apps: ["Custom Furniture", "Joinery", "Small-batch Cabinets", "Repairs & Restoration", "Decor Items", "Training Workshops"] },
    { slug: "industrial", name: "Industrial Production", solutions: 28, installs: "1,100+", photo: "steel",
      intro: "High-performance machinery and integrated production solutions for industrial manufacturers seeking precision, efficiency, automation and scalability.",
      process: ["Automated Cutting", "Edge Banding", "Drilling", "Pressing", "Conveyor Handling", "Stacking"],
      solution: ["r42", "peb580", "pbd42", "pvpm3000", "stacker", "slc"],
      benefits: [["+35%", "Increase in Production Capacity"], ["-25%", "Reduction in Downtime"], ["+40%", "Improvement in Efficiency"], ["24/7", "Built for Industrial Operation"]],
      apps: ["Panel Furniture", "Flat-pack Production", "OEM Components", "Board Processing", "Contract Manufacturing", "Export Production"] }
  ],

  cases: [
    { id: "cairo-cabinets", type: "Case Study", title: "Cabinet Factory Production Line Upgrade", city: "Cairo", country: "Egypt", industry: "cabinet", solutionType: "Production Line", year: 2024, photo: "warm",
      customer: "Cairo Cabinets Co.", summary: "Piston delivered a complete production line solution to increase capacity, reduce material waste and improve overall quality.",
      metrics: [["+28%", "Production Capacity"], ["-18%", "Material Waste"], ["+35%", "Overall Efficiency"], ["100%", "On-Time Delivery"]],
      machines: ["r32", "peb368", "pbd21", "pvpm2500"], capacity: ["380", "485", "m²/shift"], waste: ["12.5%", "10.2%"], weeks: 8, since: 2022 },
    { id: "warsaw-doors", type: "Case Study", title: "Door Manufacturing Facility Setup", city: "Warsaw", country: "Poland", industry: "door", solutionType: "Complete Setup", year: 2023, photo: "steel",
      customer: "WoodDoor Sp. z o.o.", summary: "New door manufacturing facility with CNC routing, pressing and edge finishing.",
      metrics: [["+30%", "Production Capacity"], ["-20%", "Production Cost"], ["+25%", "Quality Improvement"]], machines: ["r32", "pvpm3000", "cnc2500"], weeks: 10, since: 2023 },
    { id: "riyadh-panels", type: "Case Study", title: "Industrial Panel Production Line", city: "Riyadh", country: "Saudi Arabia", industry: "industrial", solutionType: "Production Line", year: 2024, photo: "steel",
      customer: "Riyadh Panels Industries", summary: "Automated panel production line with maximum productivity.",
      metrics: [["+40%", "Output Increase"], ["-15%", "Cycle Time"], ["+40%", "Labor Efficiency"]], machines: ["r42", "peb580", "pbd42", "stacker"], weeks: 12, since: 2021 },
    { id: "casablanca-workshop", type: "Case Study", title: "Workshop Upgrade Solution", city: "Casablanca", country: "Morocco", industry: "workshops", solutionType: "Machine Upgrade", year: 2023, photo: "wood",
      customer: "Atelier Bois Casa", summary: "Upgraded the shop with modern machines and increased productivity.",
      metrics: [["+22%", "Productivity"], ["-12%", "Setup Time"], ["+18%", "Profitability"]], machines: ["pj1300", "pbd21"], weeks: 3, since: 2023 },
    { id: "istanbul-automation", type: "Case Study", title: "Furniture Factory Automation", city: "Istanbul", country: "Turkey", industry: "furniture", solutionType: "Automation Solution", year: 2024, photo: "redish",
      customer: "Bosphorus Mobilya", summary: "Integrated automation for continuous furniture production.",
      metrics: [["+32%", "Production Output"], ["-25%", "Labor Cost"], ["+30%", "On-Time Delivery"]], machines: ["peb468", "pbd29", "slc"], weeks: 9, since: 2020 },
    { id: "bucharest-expansion", type: "Case Study", title: "Cabinet Production Capacity Expansion", city: "Bucharest", country: "Romania", industry: "cabinet", solutionType: "Capacity Expansion", year: 2023, photo: "warm",
      customer: "Carpathia Kitchens", summary: "Expanded capacity to meet demand with new machines and optimized layout.",
      metrics: [["+45%", "Capacity Increase"], ["-17%", "Lead Time"], ["+20%", "Revenue Growth"]], machines: ["r42", "peb368", "pbd29"], weeks: 7, since: 2019 },
    { id: "dubai-interior", type: "Project", title: "High-End Interior Production Line", city: "Dubai", country: "UAE", industry: "interior", solutionType: "New Line", year: 2024, photo: "redish",
      customer: "Gulf Interiors LLC", summary: "Complete interior production line for luxury fit-out projects.",
      metrics: [["+30%", "Output"], ["-15%", "Waste"]], machines: ["cnc2500", "peb368", "pvpm2500"], weeks: 9, since: 2024 },
    { id: "jakarta-factory", type: "Project", title: "Panel Furniture Factory Setup", city: "Jakarta", country: "Indonesia", industry: "furniture", solutionType: "New Line", year: 2022, photo: "wood",
      customer: "Nusantara Furniture", summary: "Greenfield panel furniture factory with a full Piston line.",
      metrics: [["+50%", "Capacity"], ["-20%", "Cost"]], machines: ["r42", "peb468", "pbd42"], weeks: 14, since: 2022 }
  ],

  news: [
    { id: "smart-manufacturing", title: "Piston Unveils Next Generation Smart Manufacturing Solutions", cat: "Company News", date: "May 15, 2024", photo: "redish", featured: true,
      excerpt: "New automation, connectivity and intelligent control features designed to maximize productivity, reduce downtime and improve efficiency." },
    { id: "ligna-2024", title: "Piston at LIGNA 2024: Thank You for Visiting Us", cat: "Events & Exhibitions", date: "May 8, 2024", photo: "steel",
      excerpt: "Thank you to everyone who visited our booth. See you next time!" },
    { id: "automation", title: "How Automation is Transforming Woodworking Production", cat: "Industry Insights", date: "Apr 25, 2024", photo: "wood",
      excerpt: "From smart edge banders to connected lines — what automation means for mid-size factories." },
    { id: "middle-east", title: "Piston Expands Global Service Network in the Middle East", cat: "Company News", date: "Apr 10, 2024", photo: "warm",
      excerpt: "New service partners in Saudi Arabia, UAE and Jordan bring faster on-site support." },
    { id: "ebs-series", title: "Edge Banding Excellence: New EBS Series", cat: "Product Updates", date: "May 1, 2024", photo: "steel",
      excerpt: "Discover the new EBS edge banding machines with improved precision and speed." },
    { id: "smart-control", title: "Smart Control System Update Now Available", cat: "Technology", date: "Apr 28, 2024", photo: "steel",
      excerpt: "Our latest software update brings more intelligence and better machine connectivity." },
    { id: "dubai-woodshow", title: "Piston Showcases Innovative Solutions in Dubai WoodShow", cat: "Events & Exhibitions", date: "Apr 20, 2024", photo: "redish",
      excerpt: "Thank you to everyone who visited our booth. See you next time!" },
    { id: "sustainability", title: "Sustainability in Manufacturing: Our Commitment", cat: "Company News", date: "Apr 12, 2024", photo: "wood",
      excerpt: "We are committed to building sustainable solutions for a better tomorrow." },
    { id: "drill-series", title: "New Drill Series Launched for High Performance", cat: "Product Updates", date: "Apr 5, 2024", photo: "steel",
      excerpt: "Built for accuracy, reliability and long-lasting performance in demanding environments." },
    { id: "case-30", title: "Case Study: 30% Productivity Increase in Cabinet Factory", cat: "Industry Insights", date: "Mar 28, 2024", photo: "warm",
      excerpt: "How our complete line solution helped a leading manufacturer achieve remarkable results." }
  ],

  videos: [
    { title: "R32 Sliding Table Saw — Full Demo", cat: "Machine Demos", dur: "05:16", views: "12.5K", date: "May 2024", photo: "steel" },
    { title: "PEB 368 Edge Bander — Live Demo", cat: "Machine Demos", dur: "04:32", views: "9.8K", date: "Apr 2024", photo: "redish" },
    { title: "PBD 21 Drilling Machine — In Action", cat: "Machine Demos", dur: "03:48", views: "7.6K", date: "Apr 2024", photo: "steel" },
    { title: "PVPM 2500 Vacuum Press — Overview", cat: "Machine Demos", dur: "06:10", views: "6.9K", date: "Mar 30, 2024", photo: "warm" },
    { title: "Complete Furniture Production Line Walkthrough", cat: "Installation Stories", dur: "08:24", views: "8.2K", date: "Mar 28, 2024", photo: "wood" },
    { title: "Machine Installation in Saudi Arabia", cat: "Installation Stories", dur: "05:02", views: "5.4K", date: "Mar 15, 2024", photo: "steel" },
    { title: "Factory Tour — Inside Our Manufacturing Facilities", cat: "Factory Tours", dur: "05:30", views: "11.1K", date: "Feb 2024", photo: "redish" },
    { title: "Success Story — Cabinet Factory +28% Productivity", cat: "Customer Stories", dur: "02:45", views: "6.1K", date: "Feb 22, 2024", photo: "warm" },
    { title: "R32 — Blade Setup & Adjustment", cat: "Maintenance Tips", dur: "06:45", views: "4.3K", date: "Jan 2024", photo: "steel" },
    { title: "R32 — Daily Maintenance", cat: "Maintenance Tips", dur: "05:29", views: "3.9K", date: "Jan 2024", photo: "steel" }
  ],

  events: [
    { id: "ligna-2025", name: "LIGNA 2025", dates: "May 26 – 30, 2025", city: "Hannover", country: "Germany", venue: "Deutsche Messe, Hannover", booth: "Hall 14, Stand D32", status: "Upcoming" },
    { id: "dubai-woodshow-2025", name: "Dubai WoodShow 2025", dates: "June 16 – 18, 2025", city: "Dubai", country: "UAE", venue: "Dubai World Trade Centre", booth: "Hall 5, Stand B18", status: "Upcoming" },
    { id: "wofx-2025", name: "WOFX 2025", dates: "August 12 – 15, 2025", city: "Istanbul", country: "Turkey", venue: "Istanbul Expo Center", booth: "TBA", status: "Upcoming" },
    { id: "awfs-2025", name: "AWFS Fair 2025", dates: "Jul 22 – 25, 2025", city: "Las Vegas", country: "USA", venue: "Las Vegas Convention Center", booth: "TBA", status: "Upcoming" }
  ],

  team: [
    { name: "Ahmed El-Sayed", role: "Regional Sales Director", email: "ahmed.elsayed@piston-machinery.com" },
    { name: "Mona Refaat", role: "Sales Manager", email: "mona.refaat@piston-machinery.com" },
    { name: "Hossam Mohsen", role: "Applications Engineer", email: "hossam.mohsen@piston-machinery.com" },
    { name: "Nadine Adel", role: "Customer Support", email: "nadine.adel@piston-machinery.com" }
  ],

  faq: [
    { cat: "Machines", q: "How do I choose the right machine for my production?", a: "Use the Machine Finder to answer five quick questions and get a recommendation with a match score, or talk to one of our engineers." },
    { cat: "Machines", q: "Are your machines CE certified?", a: "Yes. All standard Piston machines are built to CE safety standards." },
    { cat: "Quotes", q: "How do I get a price?", a: "Click \"Request a Quote\" on any machine. A WhatsApp chat opens with our sales team, pre-filled with the machines you selected. We reply within 24 hours." },
    { cat: "Warranty", q: "What warranty do you offer?", a: "Standard machines come with a 2-year warranty. Genuine spare parts have a 12-month warranty." },
    { cat: "Spare Parts", q: "Where do I find my machine's serial number?", a: "The serial number is on the identification plate at the rear of the machine, near the main electrical box." },
    { cat: "Spare Parts", q: "Do you ship spare parts internationally?", a: "Yes, we ship genuine parts worldwide with fast delivery through our service network." },
    { cat: "Service", q: "Do you provide installation and training?", a: "Yes. Our engineers handle installation, commissioning, and operator & maintenance training on site." },
    { cat: "Service", q: "Do you offer remote support?", a: "Yes. Our technical team can assist remotely for diagnostics and troubleshooting." }
  ]
};
