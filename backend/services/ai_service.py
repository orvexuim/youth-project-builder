"""
Youth Project Builder — AI Service (GPT-4o)
8-step startup generation engine
"""

import openai
import os
import json
import time

openai.api_key = os.environ.get("OPENAI_API_KEY", "")
MODEL = os.environ.get("AI_MODEL", "gpt-4o")

# ─────────────────────────────────────────────────────────────────
# STEP 2 — Business Analysis
# ─────────────────────────────────────────────────────────────────
STEP2_PROMPT = """
You are an elite startup advisor and business strategist.
Analyze the following business idea and return ONLY valid JSON (no markdown, no explanation).

Idea: {idea}

Return this exact JSON structure:
{{
  "business_name": "Creative, catchy name",
  "slogan": "Memorable tagline under 10 words",
  "description": "2-3 sentence business description",
  "target_audience": {{
    "primary": "Main demographic description",
    "secondary": "Secondary demographic",
    "age_range": "e.g. 18-35",
    "interests": ["interest1", "interest2", "interest3"]
  }},
  "problems_solved": ["problem 1", "problem 2", "problem 3"],
  "uvp": "One clear sentence: unique value proposition",
  "competitors": [
    {{"name": "Competitor 1", "weakness": "Their main weakness"}},
    {{"name": "Competitor 2", "weakness": "Their main weakness"}},
    {{"name": "Competitor 3", "weakness": "Their main weakness"}}
  ],
  "swot": {{
    "strengths": ["S1", "S2", "S3"],
    "weaknesses": ["W1", "W2"],
    "opportunities": ["O1", "O2", "O3"],
    "threats": ["T1", "T2"]
  }},
  "revenue_model": ["Revenue stream 1", "Revenue stream 2", "Revenue stream 3"],
  "startup_costs": {{
    "minimum": "$X,XXX",
    "recommended": "$XX,XXX",
    "breakdown": [
      {{"item": "Cost item", "amount": "$X,XXX"}}
    ]
  }},
  "pricing_strategy": {{
    "model": "Freemium / Subscription / One-time / etc.",
    "tiers": [
      {{"name": "Basic", "price": "$X/mo", "features": ["f1", "f2"]}},
      {{"name": "Pro", "price": "$XX/mo", "features": ["f1", "f2", "f3"]}}
    ]
  }}
}}
"""

# ─────────────────────────────────────────────────────────────────
# STEP 3 — Brand Identity
# ─────────────────────────────────────────────────────────────────
STEP3_PROMPT = """
You are an award-winning brand designer and creative director.
Based on this startup: "{business_name}" — "{description}"
Idea: {idea}

Return ONLY valid JSON:
{{
  "brand_personality": {{
    "archetype": "e.g. The Creator / The Hero / etc.",
    "traits": ["trait1", "trait2", "trait3", "trait4"],
    "tone_of_voice": "e.g. Friendly, Professional, Inspiring",
    "emotion": "The feeling the brand evokes"
  }},
  "colors": {{
    "primary": {{"hex": "#XXXXXX", "name": "Color name", "meaning": "Why this color"}},
    "secondary": {{"hex": "#XXXXXX", "name": "Color name", "meaning": "Why"}},
    "accent": {{"hex": "#XXXXXX", "name": "Color name", "meaning": "Why"}},
    "background": {{"hex": "#XXXXXX", "name": "Color name"}},
    "text": {{"hex": "#XXXXXX", "name": "Color name"}}
  }},
  "typography": {{
    "heading_font": "Font name (e.g. Poppins, Playfair Display)",
    "body_font": "Font name (e.g. Inter, Roboto)",
    "heading_weight": "700",
    "body_weight": "400",
    "google_fonts_url": "https://fonts.googleapis.com/css2?family=..."
  }},
  "logo_concept": {{
    "style": "e.g. Wordmark / Monogram / Icon + Text",
    "symbol": "Description of the icon/symbol",
    "description": "Full logo concept description",
    "do": ["Design guideline 1", "Guideline 2"],
    "dont": ["Avoid 1", "Avoid 2"]
  }},
  "style_guide": {{
    "imagery_style": "e.g. Bright photography, Illustrated, Minimal",
    "icon_style": "e.g. Line icons, Filled, Rounded",
    "spacing": "e.g. Generous white space, Compact",
    "border_radius": "e.g. Rounded (16px), Sharp (4px)",
    "overall_feel": "2-3 words describing the visual identity"
  }}
}}
"""

# ─────────────────────────────────────────────────────────────────
# STEP 4 — Business Plan
# ─────────────────────────────────────────────────────────────────
STEP4_PROMPT = """
You are a Harvard Business School professor and venture capital advisor.
Create a complete business plan for: "{business_name}" — {idea}

Return ONLY valid JSON:
{{
  "executive_summary": "3-4 sentence compelling summary",
  "mission_statement": "One sentence mission",
  "vision_statement": "Where the company will be in 5 years",
  "goals": [
    {{"period": "3 months", "goal": "Specific goal", "metric": "How measured"}},
    {{"period": "6 months", "goal": "Specific goal", "metric": "How measured"}},
    {{"period": "1 year", "goal": "Specific goal", "metric": "How measured"}}
  ],
  "milestones": [
    {{"name": "Milestone name", "date": "Month X", "description": "What it means"}},
    {{"name": "Milestone name", "date": "Month X", "description": "What it means"}},
    {{"name": "Milestone name", "date": "Month X", "description": "What it means"}},
    {{"name": "Milestone name", "date": "Month X", "description": "What it means"}}
  ],
  "budget": {{
    "initial_investment": "$XX,XXX",
    "monthly_burn_rate": "$X,XXX",
    "break_even_point": "Month X",
    "categories": [
      {{"category": "Category", "amount": "$X,XXX", "percentage": "XX%"}}
    ]
  }},
  "marketing_plan": {{
    "channels": ["Channel 1", "Channel 2", "Channel 3"],
    "budget_allocation": "60% digital, 40% content",
    "key_campaigns": ["Campaign 1", "Campaign 2"],
    "kpis": ["KPI 1", "KPI 2", "KPI 3"]
  }},
  "sales_strategy": {{
    "approach": "B2C / B2B / Hybrid",
    "channels": ["Sales channel 1", "Sales channel 2"],
    "funnel": ["Awareness", "Interest", "Decision", "Action"],
    "retention": "Customer retention strategy"
  }},
  "growth_roadmap": [
    {{"phase": "Phase 1: Launch", "timeline": "0-3 months", "focus": "Key focus area", "target": "KPI target"}},
    {{"phase": "Phase 2: Growth", "timeline": "3-6 months", "focus": "Key focus area", "target": "KPI target"}},
    {{"phase": "Phase 3: Scale", "timeline": "6-12 months", "focus": "Key focus area", "target": "KPI target"}}
  ],
  "risks": [
    {{"risk": "Risk description", "probability": "High/Medium/Low", "solution": "Mitigation strategy"}},
    {{"risk": "Risk description", "probability": "High/Medium/Low", "solution": "Mitigation strategy"}},
    {{"risk": "Risk description", "probability": "High/Medium/Low", "solution": "Mitigation strategy"}}
  ]
}}
"""

# ─────────────────────────────────────────────────────────────────
# STEP 5 — Marketing Content
# ─────────────────────────────────────────────────────────────────
STEP5_PROMPT = """
You are a viral social media strategist and content creator.
Create all marketing content for: "{business_name}" — {idea}
Brand personality: {brand_personality}

Return ONLY valid JSON:
{{
  "instagram_bio": "Instagram bio (max 150 chars, with emoji)",
  "tiktok_bio": "TikTok bio (max 80 chars, energetic)",
  "facebook_description": "Facebook page description (2-3 sentences)",
  "linkedin_description": "LinkedIn company description (professional, 3-4 sentences)",
  "content_ideas": [
    {{"id": 1, "type": "Reel/Post/Story", "title": "Content idea title", "hook": "Opening line", "platform": "Instagram/TikTok"}},
    {{"id": 2, "type": "Reel/Post/Story", "title": "Content idea title", "hook": "Opening line", "platform": "Instagram/TikTok"}}
  ],
  "instagram_captions": [
    {{"id": 1, "caption": "Full caption text with emoji", "mood": "Inspiring/Funny/Educational"}},
    {{"id": 2, "caption": "Full caption text with emoji", "mood": "Inspiring/Funny/Educational"}}
  ],
  "hashtags": {{
    "branded": ["#YourBrand", "#BrandSlogan"],
    "niche": ["#NicheTag1", "#NicheTag2", "#NicheTag3"],
    "trending": ["#TrendingTag1", "#TrendingTag2", "#TrendingTag3"],
    "general": ["#Tag1", "#Tag2", "#Tag3"]
  }},
  "email_template": {{
    "subject": "Email subject line",
    "preview": "Email preview text",
    "body": "Full email body text with placeholders like {{first_name}}"
  }},
  "promotional_text": {{
    "short": "Under 10 words promo text",
    "medium": "One sentence promo (20-30 words)",
    "long": "Full promotional paragraph (50-70 words)"
  }}
}}

Generate exactly 20 content_ideas and exactly 10 instagram_captions.
"""

# ─────────────────────────────────────────────────────────────────
# STEP 6 — Website Copy
# ─────────────────────────────────────────────────────────────────
STEP6_PROMPT = """
You are a world-class conversion copywriter and web designer.
Write complete website copy for: "{business_name}" — {idea}
Colors: primary={primary_color}, UVP: {uvp}

Return ONLY valid JSON:
{{
  "hero": {{
    "headline": "Powerful H1 headline (max 8 words)",
    "subheadline": "Supporting H2 (max 15 words)",
    "body": "2-3 sentence hero body copy",
    "cta_primary": "Primary button text",
    "cta_secondary": "Secondary button text",
    "social_proof": "e.g. Trusted by 1,000+ users"
  }},
  "features": [
    {{"icon": "emoji", "title": "Feature title", "description": "2 sentence feature description"}},
    {{"icon": "emoji", "title": "Feature title", "description": "2 sentence feature description"}},
    {{"icon": "emoji", "title": "Feature title", "description": "2 sentence feature description"}},
    {{"icon": "emoji", "title": "Feature title", "description": "2 sentence feature description"}},
    {{"icon": "emoji", "title": "Feature title", "description": "2 sentence feature description"}},
    {{"icon": "emoji", "title": "Feature title", "description": "2 sentence feature description"}}
  ],
  "about": {{
    "title": "About section title",
    "body": "3-4 sentence about us copy",
    "stats": [
      {{"value": "XXX+", "label": "Stat label"}},
      {{"value": "XXX+", "label": "Stat label"}},
      {{"value": "XXX%", "label": "Stat label"}}
    ]
  }},
  "faq": [
    {{"question": "FAQ question?", "answer": "Clear, helpful answer."}}
  ],
  "contact": {{
    "title": "Contact section title",
    "subtitle": "Contact section subtitle",
    "cta": "Contact button text"
  }},
  "cta_section": {{
    "headline": "Final CTA headline",
    "subtext": "Supporting text",
    "button": "CTA button text"
  }},
  "seo": {{
    "meta_title": "Page title (60 chars max)",
    "meta_description": "Meta description (155 chars max)",
    "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
  }}
}}

Generate exactly 6 features and exactly 5 faq items.
"""

# ─────────────────────────────────────────────────────────────────
# STEP 7 — Pitch Deck
# ─────────────────────────────────────────────────────────────────
STEP7_PROMPT = """
You are a Silicon Valley pitch coach who has helped raise $500M in funding.
Create a complete investor pitch deck for: "{business_name}" — {idea}

Return ONLY valid JSON:
{{
  "slides": [
    {{
      "slide": 1,
      "title": "Cover",
      "headline": "{business_name}",
      "subtext": "Tagline or one-liner",
      "speaker_notes": "What to say on this slide"
    }},
    {{
      "slide": 2,
      "title": "Problem",
      "headline": "The Problem We Solve",
      "points": ["Pain point 1", "Pain point 2", "Pain point 3"],
      "stat": "Compelling statistic about the problem",
      "speaker_notes": "What to say"
    }},
    {{
      "slide": 3,
      "title": "Solution",
      "headline": "Our Solution",
      "body": "Clear description of the product/service",
      "points": ["Key benefit 1", "Key benefit 2", "Key benefit 3"],
      "speaker_notes": "What to say"
    }},
    {{
      "slide": 4,
      "title": "Market",
      "headline": "Market Opportunity",
      "tam": "Total Addressable Market: $XB",
      "sam": "Serviceable Addressable Market: $XM",
      "som": "Serviceable Obtainable Market: $XM",
      "insight": "Key market insight",
      "speaker_notes": "What to say"
    }},
    {{
      "slide": 5,
      "title": "Product",
      "headline": "How It Works",
      "steps": ["Step 1", "Step 2", "Step 3"],
      "demo_description": "What users see/experience",
      "speaker_notes": "What to say"
    }},
    {{
      "slide": 6,
      "title": "Business Model",
      "headline": "How We Make Money",
      "revenue_streams": ["Stream 1: description", "Stream 2: description"],
      "unit_economics": "Key unit economics",
      "speaker_notes": "What to say"
    }},
    {{
      "slide": 7,
      "title": "Competitors",
      "headline": "Competitive Landscape",
      "our_advantages": ["Advantage 1", "Advantage 2", "Advantage 3"],
      "positioning": "How we position vs competitors",
      "speaker_notes": "What to say"
    }},
    {{
      "slide": 8,
      "title": "Marketing",
      "headline": "Go-To-Market Strategy",
      "phases": ["Phase 1: description", "Phase 2: description", "Phase 3: description"],
      "key_channels": ["Channel 1", "Channel 2", "Channel 3"],
      "speaker_notes": "What to say"
    }},
    {{
      "slide": 9,
      "title": "Financial Projection",
      "headline": "Financial Projections (3 Years)",
      "projections": [
        {{"year": "Year 1", "revenue": "$X", "users": "X", "profit": "$X"}},
        {{"year": "Year 2", "revenue": "$X", "users": "X", "profit": "$X"}},
        {{"year": "Year 3", "revenue": "$X", "users": "X", "profit": "$X"}}
      ],
      "assumptions": ["Assumption 1", "Assumption 2"],
      "speaker_notes": "What to say"
    }},
    {{
      "slide": 10,
      "title": "Future Vision",
      "headline": "Our Vision for the Future",
      "vision": "Where we'll be in 5 years",
      "expansion": ["Expansion idea 1", "Expansion idea 2"],
      "closing": "Powerful closing statement",
      "ask": "What we're asking for (funding amount if applicable)",
      "speaker_notes": "What to say"
    }}
  ]
}}
"""

# ─────────────────────────────────────────────────────────────────
# STEP 8 — Action Roadmap
# ─────────────────────────────────────────────────────────────────
STEP8_PROMPT = """
You are a startup execution coach. Create a realistic, actionable roadmap for:
"{business_name}" — {idea}

Return ONLY valid JSON:
{{
  "week1": {{
    "theme": "Week 1 theme",
    "focus": "Main focus area",
    "tasks": [
      {{"day": "Day 1-2", "action": "Specific action", "outcome": "Expected result", "priority": "HIGH"}},
      {{"day": "Day 3-4", "action": "Specific action", "outcome": "Expected result", "priority": "HIGH"}},
      {{"day": "Day 5-7", "action": "Specific action", "outcome": "Expected result", "priority": "MEDIUM"}}
    ],
    "milestone": "What you'll have at end of week 1"
  }},
  "week2": {{
    "theme": "Week 2 theme",
    "focus": "Main focus area",
    "tasks": [
      {{"day": "Day 8-9", "action": "Specific action", "outcome": "Expected result", "priority": "HIGH"}},
      {{"day": "Day 10-11", "action": "Specific action", "outcome": "Expected result", "priority": "HIGH"}},
      {{"day": "Day 12-14", "action": "Specific action", "outcome": "Expected result", "priority": "MEDIUM"}}
    ],
    "milestone": "What you'll have at end of week 2"
  }},
  "month1": {{
    "theme": "Month 1 theme",
    "focus": "Main focus",
    "objectives": ["Objective 1", "Objective 2", "Objective 3"],
    "key_actions": ["Action 1", "Action 2", "Action 3", "Action 4"],
    "kpis": [{{"metric": "KPI name", "target": "Target value"}}],
    "milestone": "Month 1 milestone"
  }},
  "month3": {{
    "theme": "Month 3 theme",
    "focus": "Main focus",
    "objectives": ["Objective 1", "Objective 2", "Objective 3"],
    "key_actions": ["Action 1", "Action 2", "Action 3"],
    "kpis": [{{"metric": "KPI name", "target": "Target value"}}],
    "milestone": "Month 3 milestone"
  }},
  "month6": {{
    "theme": "Month 6 theme",
    "focus": "Main focus",
    "objectives": ["Objective 1", "Objective 2", "Objective 3"],
    "key_actions": ["Action 1", "Action 2", "Action 3"],
    "kpis": [{{"metric": "KPI name", "target": "Target value"}}],
    "milestone": "Month 6 milestone"
  }},
  "year1": {{
    "theme": "Year 1 theme",
    "vision": "Where the company is at Year 1",
    "objectives": ["Objective 1", "Objective 2", "Objective 3", "Objective 4"],
    "revenue_target": "$ target",
    "team_size": "X people",
    "key_achievements": ["Achievement 1", "Achievement 2", "Achievement 3"],
    "next_steps": ["What comes in Year 2"]
  }}
}}
"""

# ─────────────────────────────────────────────────────────────────
# Core generation function
# ─────────────────────────────────────────────────────────────────
def call_ai(prompt: str, temperature: float = 0.8) -> dict:
    """Call OpenAI and parse JSON response."""
    start = time.time()
    
    response = openai.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": "You are an elite startup advisor. Always respond with valid JSON only. No markdown, no explanation outside the JSON."
            },
            {"role": "user", "content": prompt}
        ],
        response_format={"type": "json_object"},
        temperature=temperature,
        max_tokens=4096,
    )
    
    elapsed_ms = int((time.time() - start) * 1000)
    content = response.choices[0].message.content
    result = json.loads(content)
    result["_meta"] = {
        "tokens": response.usage.total_tokens,
        "time_ms": elapsed_ms,
        "model": MODEL,
    }
    return result


def generate_step2(idea: str) -> dict:
    return call_ai(STEP2_PROMPT.format(idea=idea))


def generate_step3(idea: str, business_name: str, description: str) -> dict:
    return call_ai(STEP3_PROMPT.format(
        idea=idea, business_name=business_name, description=description
    ))


def generate_step4(idea: str, business_name: str) -> dict:
    return call_ai(STEP4_PROMPT.format(idea=idea, business_name=business_name))


def generate_step5(idea: str, business_name: str, brand_personality: str) -> dict:
    return call_ai(STEP5_PROMPT.format(
        idea=idea, business_name=business_name,
        brand_personality=brand_personality
    ))


def generate_step6(idea: str, business_name: str, uvp: str, primary_color: str) -> dict:
    return call_ai(STEP6_PROMPT.format(
        idea=idea, business_name=business_name,
        uvp=uvp, primary_color=primary_color
    ))


def generate_step7(idea: str, business_name: str) -> dict:
    return call_ai(STEP7_PROMPT.format(
        idea=idea, business_name=business_name
    ))


def generate_step8(idea: str, business_name: str) -> dict:
    return call_ai(STEP8_PROMPT.format(
        idea=idea, business_name=business_name
    ))
