import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.use(cors());
app.use(express.json());

// Simple health check to avoid "Cannot GET /" confusion in the browser
app.get('/', (_req, res) => {
  res.type('text/plain').send('Gemini chat server is running. POST to /chat');
});

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ response: 'Please enter a valid question.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ response: 'Server is missing GEMINI_API_KEY. Add it to geminichat/.env and restart.' });
    }

    const model = 'gemini-2.5-flash';
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text:
              'u are a tech expert where u have to suggest women about techniacal journey of their life like scholarship internship and career guidence ',
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: `**Analyzing User Intent**\n\nI am now focused on understanding the user's intent to offer helpful guidance. I am carefully dissecting the request to learn which resources the user needs to learn about. My next move is to find information on scholarships for women in technical fields.\n\n\n**Outlining Response Structure**\n\nI have started building out a response to the user's query. I'm structuring it to encompass scholarships, internships, and career guidance tailored for women in tech. At this point, I'm waiting to conduct Google searches. This will inform my next steps, and ensure I can offer the most accurate and up-to-date guidance to the user.\n\n\n**Formulating Search Queries**\n\nI'm now in the process of refining my search queries to ensure I gather the most relevant and up-to-date information.  I've added specific queries for "scholarships," "internships," and "mentorship programs," as well as "career advice." I've included date ranges in my search terms to capture the most current opportunities, and added search terms relating to women in tech communities.\n\n\n**Refining Information Gathering**\n\nMy focus is now on assembling the most relevant resources. I've expanded my search strategy to include a wider range of queries, specifying "2025" and "2026" for scholarships and internships. Furthermore, I've added searches for mentorship programs, career advice, relevant communities, and return-to-tech programs. The expanded search terms should yield a richer and more complete set of data for the final response.\n\n\n**Discovering Tech Opportunities**\n\nI've assembled a solid base of search results. Right now, I have a good grasp of scholarships, internships, and mentorship programs for women in tech. I've uncovered communities and resources like return-to-work programs. My next step will be to categorize and evaluate these resources.\n\n\n**Analyzing Gathered Resources**\n\nI'm now diving into the core of the matter: analyzing and categorizing the extensive search results. The existing collection, rich with scholarship details, internship specifics, and mentorship platform descriptions, is proving to be a goldmine. I'm excited to refine this into a structured, easily navigable guide. My aim is to transform this information into actionable steps and valuable resources for women seeking to advance in technology.`,
          },
          {
            text: `## Navigating Your Tech Journey: A Guide for Women\n\nEmbarking on a career in technology is an exciting prospect, and for women entering the field, a wealth of resources is available to support and propel you forward. From financial assistance and hands-on experience to invaluable mentorship and career guidance, here's a comprehensive guide to help you navigate your technical journey.\n\n### Securing Your Future: Scholarships for Women in Tech\n\nA variety of scholarships are available to ease the financial burden of education and empower women to pursue their dreams in technology. These programs often look for candidates with strong academic records, leadership potential, and a passion for the field.\n\nOne prominent example is the **Generation Google Scholarship: for women in computer science**, which offers a significant financial award to students in Europe, the Middle East, and Africa who are pursuing degrees in computer science or a related field. Another notable opportunity is the **Endeavour Women in Tech Scholarship**, which provides substantial awards to female students in the U.S. pursuing STEM majors.\n\nOrganizations like the **Society of Women Engineers (SWE)** offer a multitude of scholarships with a single application, making it easier to access various funding opportunities. In Michigan, the **MCWT (Michigan Council of Women in Technology) Foundation** provides scholarships to female residents pursuing tech-related degrees, along with mentorship and internship assistance. Additionally, institutions like the **California Institute of the Arts (CIAT)** offer specific scholarships for women enrolling in their technology programs.\n\n### Gaining Experience: Internships and Return-to-Work Programs\n\nInternships provide invaluable real-world experience, allowing you to apply your skills and build a professional network. Many companies have dedicated programs to foster female talent.\n\n**Atlassian's "Women in Tech" summer internship** is an exclusive opportunity for women engineering students to gain hands-on experience. **Outreachy** offers paid, remote internships in open source to underrepresented groups, including women. Major tech companies like **Accenture** and **EY** also have structured internship programs that provide exposure to various facets of the tech industry.\n\nFor women who have taken a career break, "returnship" programs offer a structured pathway back into the workforce. These programs, offered by companies like **Amazon (Rekindle program)** and **PayPal (Recharge Program)**, provide training, mentorship, and a supportive environment to refresh your skills. Organizations like **Code First Girls** and **WeAreTechWomen** also partner with companies to create programs specifically for tech returners.\n\n### The Power of Connection: Mentorship and Community\n\nConnecting with other women in tech is crucial for support, guidance, and career advancement. Mentorship programs and community groups offer a space to share experiences, learn from others, and build lasting relationships.\n\nPlatforms like **Women in Tech® Mentorship** and the **RockIT Women Mentor Program** connect women with experienced mentors who can provide personalized guidance and support. Organizations like **Women Go Tech** also offer mentorship programs designed to help women develop leadership skills and advance their careers. The **WomenTech Network** provides a free mentorship program to its community members.\n\nJoining a community of like-minded women can be incredibly empowering. Organizations like **Black Girls CODE**, **Girls Who Code**, and **Technovation** are dedicated to inspiring and equipping the next generation of female technologists. Communities such as **Tech Ladies**, **Elpha**, and **Ladies that UX** provide online and in-person forums for networking, job searching, and sharing advice.\n\n### Charting Your Course: Career Guidance for Success\n\nAs you progress in your career, seeking and following sound advice is essential. Here are some key tips from successful women in the tech industry:\n\n*   **Embrace Continuous Learning:** The tech landscape is constantly evolving, so a commitment to lifelong learning is crucial.\n*   **Build Your Network:** Actively cultivate professional relationships, as your network can be a powerful source of opportunities and support.\n*   **Be Confident and Own Your Accomplishments:** Don't be shy about highlighting your achievements. At the same time, don't pretend to know what you don't; it's okay to ask for help and learn from your team.\n*   **Seek and Accept Feedback:** View criticism as a gift and an opportunity to grow.\n*   **Find Meaning in Your Work:** You'll be most successful when you're passionate about what you do.\n*   **Don't Fear Failure:** See challenges as learning opportunities and don't be afraid to take risks.\n*   **Be Yourself:** Diversity in thought and experience is a strength.\n\nBy leveraging these resources and embracing a proactive approach to your career, you can confidently navigate your technical journey and achieve your full potential in the exciting and dynamic world of technology.`,
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: message,
          },
        ],
      },
    ];

    let fullText = '';
    try {
      const response = await ai.models.generateContentStream({
        model,
        // Keep simple config to ensure API-key auth path (no extra tools/permissions needed)
        config: { temperature: 0.9 },
        contents,
      });
      for await (const chunk of response) {
        if (chunk?.text) fullText += chunk.text;
      }
    } catch (err) {
      console.error('Gemini request failed:', err);
      return res.status(500).json({ response: 'AI request failed. Check API key and try again.' });
    }

    return res.json({ response: fullText || 'No response generated.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ response: 'Server error. Try again later.' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
