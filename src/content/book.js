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
          title: 'HOW: a mental health app',
          line: 'Team project, app design concept',
          photos: [img('how/01.webp', 'High-fidelity screens of the HOW app')],
          bullets: [
            ['Goal', 'Help people look after their mental wellbeing day to day.'],
            ['Approach', 'Research and paper prototypes, then a simpler idea based on feedback.'],
            ['Result', 'An app concept for individuals and for teams.'],
          ],
          role: 'App idea, design system, prototypes, graphics',
          tools: 'Figma, Miro',
        },
        {
          type: 'process',
          photos: [img('how/02.webp', 'Early paper prototypes for HOW'), img('how/03.webp', 'Early sitemap for HOW')],
          steps: [
            ['Understand', 'Surveys, personas, empathy and scenario maps showed us what people need.'],
            ['Prototype', 'We sketched a sitemap and paper prototypes of the first features.'],
            ['Refine', 'Feedback showed us what to cut. We kept finding help and learning easy.'],
            ['Design', 'Then we made wireframes, a design system and high-fidelity screens.'],
          ],
        },
        {
          type: 'project',
          title: 'Corvus Sanctum',
          line: 'Team project, VR game',
          photos: [
            img('corvus/02.webp', 'Corvus Sanctum poster'),
            img('corvus/08.webp', 'Candle-lit VR room with a body on a table'),
            img('corvus/03.webp', 'The coffin room in Corvus Sanctum'),
            img('corvus/04.webp', 'A corridor in Corvus Sanctum'),
          ],
          bullets: [
            ['Goal', 'A tense VR escape room that starts in a coffin.'],
            ['Approach', 'Puzzles plus stealth: make noise and the doctor finds you.'],
          ],
          role: 'Map design, 3D modelling, poster',
          tools: 'Unity, Blender, Miro, Canva',
        },
        {
          type: 'project',
          title: 'XR Interaction in automotive design',
          line: 'Team project, XR research',
          photos: [img('automotive/01.webp', 'Foot gesture interaction in a virtual car')],
          bullets: [
            ['Goal', 'Find out if feet can help control 3D models in VR.'],
            ['Approach', 'Foot gestures to zoom, rotate and move, tested with 12 people.'],
            ['Result', 'Feet for big moves, hands for fine control. People liked both together.'],
          ],
          role: 'Research on existing work, gesture concept, study plan, user tests',
          tools: 'Unity, Varjo XR3, Miro',
        },
        {
          type: 'project', title: 'OrCam vs. Ray-Ban Meta',
          line: 'Team project, usability study',
          photos: [img('glasses/01.webp', 'Participant testing smart glasses'), img('glasses/02.webp', 'Participant using smart glasses to read a document')],
          bullets: [
            ['Goal', 'Find out which smart glasses help more with everyday tasks.'],
            ['Approach', '15 people with simulated low vision tried both glasses.'],
            ['Result', 'Ray-Ban Meta was almost twice as fast: 351 s against 632 s.'],
          ],
          role: 'Planning the study, running the tests, analysing results', tools: 'OrCam MyEye, Ray-Ban Meta',
        },
        {
          type: 'process',
          description: 'OrCam MyEye is made for people with low vision. Ray-Ban Meta is everyday glasses with an AI assistant. We measured how fast people were with each, how often they succeeded and how they felt about it.',
          steps: [
            ['Set up', '15 people with simulated low vision got a short intro, then used both glasses.'],
            ['Observe', 'They sorted shapes, found information in documents and walked through a room.'],
            ['Evaluate', 'We compared task times, success rates and User Experience Questionnaire scores.'],
            ['Reflect', 'Everyone was young and fairly similar, so the results have limits.'],
          ],
        },
        {
          type: 'project', title: 'AR for factory maintenance',
          line: 'Bachelor’s thesis, 2025',
          photos: [img('thesis/01.webp', 'Augmented reality interface concept for maintenance'), img('thesis/02.webp', 'AR maintenance thesis project image')],
          bullets: [
            ['Goal', 'Find where AR information should appear: easy to notice, not distracting.'],
            ['Approach', 'Interviews, prototypes in Figma and Unity, and tests comparing layouts.'],
            ['Result', 'Alerts in the middle were noticed faster but blocked more of the view.'],
          ],
          role: 'Research, interface design, prototyping and user studies', tools: 'Figma, Unity',
        },
        {
          type: 'process',
          description: 'For my thesis at Bosch, I looked at how AR can help with maintenance work without blocking the view. Where should information appear, and should it move with the person or stay put in the room?',
          steps: [
            ['Understand', 'Interviews showed what maintenance work needs from an interface.'],
            ['Prototype', 'In Figma and Unity I tried different placements, fixed and moving.'],
            ['Compare', 'Usability tests compared how visible and how distracting each layout was.'],
            ['Learn', 'Urgent alerts work best in the middle. Important but less urgent ones work well near the top edge.'],
          ],
          note: 'A small study in an office and lab, not tested in a real factory.',
        },
        {
          type: 'project', title: 'Ho My Board!',
          line: '3D UI, master’s team project',
          photos: [img('3dui/01.webp', 'Ho My Board! VR parkour project artwork', 'Project artwork')],
          bullets: [
            ['Goal', 'A VR parkour game where you ride a hoverboard.'],
            ['Approach', 'We built the game prototype in Unity as a course project.'],
          ],
          role: 'Team project', tools: 'Unity',
        },
        {
          type: 'project', title: 'VR Movie Director',
          line: 'Multimodal Interfaces, master’s team project',
          photos: [img('mmi/01.webp', 'VR Movie Director virtual film set and interface')],
          bullets: [
            ['Goal', 'Direct a virtual film scene by talking and pointing.'],
            ['Approach', 'You say what should happen and point at where it should happen.'],
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
