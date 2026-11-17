/* All words and images in the book. Edit content here; no component holds copy.

   Project details are based on Lia’s supplied project evidence and portfolio.
   Team contributions and study limitations are kept explicit.

   Writing rules (from simcadia-root/distribution/non_ai_sounding_guidance.md):
   short bullets in plain words, one heading per page with nothing above it,
   no em or en dashes, every line tells the reader something.

   Shape
     cover / back      the hard covers
     chapters[]        { id, tab, title, note, pages }; every chapter has an even
                       number of pages, so it starts on a left page
       page.type       picks a layout in components/Page.jsx:
                       about | timeline | project | process | gallery | skills | contact */

const img = (path, alt, caption) => ({ src: `${import.meta.env.BASE_URL}media/${path}`, alt, caption })

export const book = {
  cover: { name: ['Efthalia', 'Vogiari'], line: 'UX designer' },

  chapters: [
    {
      id: 'about',
      tab: 'About',
      title: 'About me',
      note: 'lime',
      pages: [
        {
          type: 'about',
          title: 'Hi, I’m Lia.',
          photo: img('about/portrait.webp', 'Lia standing in a green tea field', 'Efthalia, but call me Lia :)'),
          bullets: [
            'I’m a UX designer. I studied Mobile Media, where I learned both design and coding.',
            'I’ve worked on digital products at university and at companies like Bosch. I like talking to users, testing ideas and building prototypes.',
            'I’m most excited about XR and healthcare, and about tech that helps people in daily life.',
          ],
        },
        {
          type: 'timeline',
          title: 'So far',
          items: [
            { when: '2021-25', what: 'Bachelor’s in Mobile Media', where: 'Stuttgart Media University', detail: 'Computer science and UX design', kind: 'study' },
            { when: '2021-22', what: 'Working student SAP', where: 'CureVac', kind: 'work' },
            { when: '2022-23', what: 'Exchange semester', where: 'Metropolia, Helsinki', detail: 'Information Technology', kind: 'study' },
            { when: '2023-25', what: 'UX intern, then working student', where: 'Bosch Digital', kind: 'work', detail: 'UX design for digital products' },
            { when: '2025', what: 'Bachelor’s thesis on AR', where: 'Bosch Digital', kind: 'study', detail: 'AR concepts, prototypes and user studies' },
            { when: '2026', what: 'Master’s in HCI', where: 'University of Würzburg', kind: 'study', now: true },
            { when: '2026', what: 'Accessibility and UX', where: 'BearingPoint', detail: 'Making digital products accessible', kind: 'work', now: true },
          ],
        },
      ],
    },

    {
      id: 'projects',
      tab: 'Projects',
      title: 'Projects',
      note: 'blue',
      pages: [
        {
          type: 'project',
          title: 'HOW: Mental Wellbeing App',
          line: 'A human-centered app concept for everyday mental wellbeing.',
          photos: [img('how/01.webp', 'High-fidelity screens of the HOW app')],
          bullets: [
            ['About', 'HOW explores how digital tools can help people better understand and manage their mental wellbeing. Through guided learning and immediate support, the app aims to make self-discovery and healthier coping strategies more accessible.'],
            ['Project', 'Group Project · App Design Concept'],
          ],
          role: 'Concept Development, Prototyping, Design System, Visual Design',
          tools: 'Figma, Miro',
        },
        {
          type: 'process',
          spaced: true,
          steps: [
            ['01 — The Challenge', "In response to the psychological strain caused by COVID-19, we explored how a digital app could support people's mental wellbeing."],
            ['02 — User Research', "Through surveys, personas, empathy maps and scenario maps, we identified users' needs and situations in which they might need support."],
            ['03 — Refining the Concept', 'Our first prototypes revealed an overly broad concept. Based on feedback, we narrowed it down to two core features: a guided Learnmap and SOS support.'],
            ['04 — Visual Design', 'We refined the information architecture, developed wireframes and created a design system to guide the final high-fidelity prototypes.'],
            ['Outcome', 'A focused app concept for guided self-discovery and mental wellbeing.'],
          ],
        },
        {
          type: 'project',
          title: 'Corvus Sanctum',
          line: 'A VR escape room',
          photos: [
            img('corvus/02.webp', 'Corvus Sanctum poster'),
            img('corvus/book-render.png', '3D renders of a book for Corvus Sanctum'),
            img('corvus/04.webp', 'A corridor in Corvus Sanctum'),
            img('corvus/lab-render.png', '3D renders of laboratory objects for Corvus Sanctum'),
            img('corvus/08.webp', 'Candle-lit VR room with a body on a table'),
          ],
          bullets: [
            ['About', 'A tense VR escape room that starts in a coffin.'],
            ['Project', 'Group Project · VR Escape Room'],
          ],
          role: 'Map design, 3D modelling, poster',
          tools: 'Unity, Blender, Miro, Canva',
        },
        {
          type: 'project',
          title: 'XR Interaction in Automotive Design',
          line: 'VR Gesture Interaction Study',
          photos: [img('automotive/01.webp', 'Foot gesture interaction in a virtual car')],
          bullets: [
            ['About', 'Explore the usability of foot gestures compared to hand interactions.'],
            ['Project', 'Group Project · VR Interaction Study'],
          ],
          role: 'State-of-the-Art Analysis, Gesture Concept, User Study, User Testing',
          tools: 'Unity, Varjo XR-3, Miro',
          process: 'We designed three foot gestures for zooming, rotation and movement, and evaluated them in a comparative study with 12 participants. Results showed that foot gestures work well for larger movements, while hand gestures offer greater precision. Participants preferred combining both modalities.',
        },
        {
          type: 'project', title: 'OrCam MyEye vs Ray-Ban Meta',
          line: 'A usability study',
          photos: [img('glasses/01.webp', 'Participant testing smart glasses'), img('glasses/02.webp', 'Participant using smart glasses to read a document')],
          bullets: [
            ['About', 'Evaluate and compare the efficiency, effectiveness and user experience of both devices.'],
            ['Approach', 'Comparative user study with 15 participants using simulated visual impairments.'],
            ['Project', 'Group Project · Usability Study'],
          ],
          role: 'User Study Design, User Testing, Data Evaluation', tools: 'OrCam MyEye, Ray-Ban Meta',
        },
        {
          type: 'process',
          spaced: true,
          steps: [
            ['The Challenge', 'People with visual impairments face everyday challenges such as reading, identifying objects and navigating unfamiliar environments. We investigated whether Ray-Ban Meta could offer assistance comparable to the specialized OrCam MyEye.'],
            ['User Study', '15 participants with simulated visual impairments tested both devices across three scenarios: sorting shapes, retrieving information from documents and navigating a room. We measured task completion time, success rates and user experience using the UEQ.'],
            ['Key Findings', 'Ray-Ban Meta enabled faster task completion (351s vs. 632.2s), higher success rates and more positive UX ratings. OrCam offered specialized features but struggled with response times, interaction feedback and battery life.'],
            ['', 'The results highlight the potential of AI-powered smart glasses as assistive technologies, while emphasizing the importance of reliable and accessible interactions.'],
          ],
        },
        {
          type: 'project', title: 'AR for factory maintenance',
          line: 'Bachelor’s thesis',
          photos: [img('thesis/01.webp', 'Augmented reality interface concept for maintenance'), img('thesis/02.webp', 'AR maintenance thesis project image')],
          bullets: [
            ['About', 'Find where AR information should appear: easy to notice, not distracting.'],
            ['Project', 'Bachelor’s Thesis · AR Research'],
          ],
          role: 'Research, interface design, prototyping and user studies', tools: 'Figma, Unity',
        },
        {
          type: 'process',
          spaced: true,
          steps: [
            ['The Challenge', 'AR can support maintenance workers with contextual information, but poorly positioned overlays can obstruct the real environment, increase cognitive load and create safety risks. We investigated how information placement affects usability and safety.'],
            ['Design Process', 'Following a Human-Centered Design approach, we interviewed maintenance workers to understand their workflows and needs. Based on these insights, we derived user requirements and developed AR concepts focusing on spatial placement, anchoring and notifications.'],
            ['Evaluation & Findings', 'We compared two interface concepts in a user study, evaluating user experience (UEQ), mental workload (NASA-TLX) and reaction times. Central, head-anchored displays improved visibility and reaction times but risked obstructing the environment. Central placement worked best for urgent alerts, while less urgent information benefited from peripheral positioning or subtle visual cues.'],
          ],
        },
        {
          type: 'project', title: 'VR Flightstick Locomotion',
          line: 'Interaction Technique Development',
          video: { src: 'https://www.youtube-nocookie.com/embed/EOAJQPKAQLw?autoplay=1', poster: `${import.meta.env.BASE_URL}media/3dui/flightstick.png`, label: 'VR Flightstick Locomotion project video' },
          bullets: [
            ['About', 'Developed a VR locomotion technique that uses intuitive hand tilting with a physical controller to control movement direction and speed.'],
            ['Project', 'Group Project · VR Game'],
          ],
          role: 'Ideation of locomotion technique, implementation', tools: 'Unity',
        },
        {
          type: 'project', title: 'VR Movie Director',
          line: 'Multimodal Interfaces, master’s team project',
          photos: [img('mmi/01.webp', 'VR Movie Director virtual film set and interface')],
          bullets: [
            ['About', 'Direct a virtual film scene by talking and pointing.'],
            ['Project', 'Group Project · Multimodal Interfaces'],
            ['My work', 'With Nico: commands with two pointing gestures, several ways to say each command, and a reusable package that joins speech and pointing.'],
          ],
          role: 'Multimodal interaction and team development', tools: 'Unity',
        },
      ],
    },

    {
      id: 'side',
      tab: 'Side',
      title: 'On the side',
      note: 'pink',
      pages: [
        {
          type: 'gallery', title: 'Social media',
          groups: [
            { line: '2024-25: I ran ESN Stuttgart’s social media.', photos: [
              img('social/01.webp', 'Halloween party poster'), img('social/02.webp', 'Traffic light party poster'), img('social/06.webp', 'ESNcard explainer post'),
            ] },
            { line: '', photos: [
              img('social/07.webp', 'Welcome week social media post'), img('social/08.webp', 'Welcome week party poster'), img('social/09.webp', 'Event calendar'),
            ] },
          ],
        },
        {
          type: 'gallery', title: 'Through my lens',
          groups: [
            { line: 'Small details, city streets and places I’ve travelled to.', photos: [
              img('photo/07.webp', 'Neon-lit Korean shopfront at night'), img('photo/09.webp', 'Coastal cliffs and town from above'), img('photo/12.webp', 'Silhouetted street at sunset'),
            ] },
            { line: '', photos: [
              img('photo/collection.webp', 'A collection of travel and street photography'),
            ] },
          ],
        },
      ],
    },

    {
      id: 'contact',
      tab: 'Contact',
      title: 'Skills and contact',
      note: 'lime',
      pages: [
        {
          type: 'skills',
          title: 'Skills',
          groups: [
            ['Tools', ['Figma', 'Affinity', 'Miro', 'Canva', 'Blender', 'Unity']],
            ['Programming', ['Python', 'JavaScript', 'Java', 'Swift', 'HTML', 'CSS']],
            ['Accessibility', ['WCAG', 'BITV 2.0', 'EN 301 549']],
          ],
          languages: [
            ['de', 'German', 'native'],
            ['gr', 'Greek', 'native'],
            ['gb', 'English', 'fluent'],
            ['es', 'Spanish', 'basic'],
          ],
        },
        {
          type: 'contact',
          title: 'Say hi!',
          email: 'lia.vogiari@aol.de',
          links: [['LinkedIn', 'https://www.linkedin.com/in/efthalia-vogiari/']],
        },
      ],
    },
  ],

  back: { line: 'Thanks for reading.' },
}
