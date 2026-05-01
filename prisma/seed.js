// prisma/seed.js — Seeds the KCSE Mastery App database with the full KLB Form 1-4 syllabus
// Run: node prisma/seed.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const SUBJECTS = [
  {
    name: "Mathematics",
    slug: "mathematics",
    icon: "∑",
    paper: "Paper 1 & 2",
    topics: [
      // ── Form 1 ──
      { name: "Natural Numbers", slug: "natural-numbers", form: 1, summary: "Place value, number bases, HCF & LCM, prime numbers" },
      { name: "Fractions", slug: "fractions", form: 1, summary: "Types, operations, mixed numbers, decimal fractions" },
      { name: "Decimals & Percentages", slug: "decimals", form: 1, summary: "Operations, rounding off, significant figures, percentage change" },
      { name: "Squares, Roots & Indices", slug: "squares-roots", form: 1, summary: "Squares, square roots, cubes, cube roots, powers & indices" },
      { name: "Algebraic Expressions", slug: "algebra-intro", form: 1, summary: "Simplification, substitution, linear equations, forming equations" },
      { name: "Commercial Arithmetic I", slug: "commercial1", form: 1, summary: "Profit & loss, discount, VAT, hire purchase, currency exchange" },
      { name: "Coordinate Geometry I", slug: "coordinates1", form: 1, summary: "Cartesian plane, plotting points, distance between two points" },
      { name: "Geometrical Constructions", slug: "geometry-constructions", form: 1, summary: "Using ruler & compass: angles, perpendiculars, bisectors, polygons" },
      { name: "Scale Drawing", slug: "scale-drawing", form: 1, summary: "Reading scales, converting, maps & plans" },
      // ── Form 2 ──
      { name: "Formulae & Variations", slug: "formulae-variations", form: 2, summary: "Direct, inverse, joint and partial variation" },
      { name: "Sequences & Series", slug: "sequences-series", form: 2, summary: "AP and GP, finding nth term, sum of series" },
      { name: "Indices & Logarithms", slug: "indices-logs", form: 2, summary: "Laws of indices, log tables, natural logarithms" },
      { name: "Gradient & Straight Lines", slug: "gradient-lines", form: 2, summary: "Gradient calculation, y=mx+c, equation of a line, perpendicular lines" },
      { name: "Reflection & Congruence", slug: "reflection", form: 2, summary: "Line symmetry, reflection on axes, congruent triangles" },
      { name: "Rotation", slug: "rotation", form: 2, summary: "Centre, angle, direction of rotation, combined transformations" },
      { name: "Similarity & Enlargement", slug: "similarity", form: 2, summary: "Scale factor, similar triangles, area & volume scale factors" },
      { name: "Trigonometry I", slug: "trig1", form: 2, summary: "Sine, cosine, tangent, angles 0°–360°, special angles" },
      { name: "Area of Polygons & Circles", slug: "area-polygons", form: 2, summary: "Triangles, quadrilaterals, circles, sectors, segments" },
      { name: "Surface Area & Volume I", slug: "surface-volume1", form: 2, summary: "Cubes, cuboids, cylinders, cones, pyramids, spheres" },
      // ── Form 3 ──
      { name: "Quadratic Equations & Expressions", slug: "quadratic-eqn", form: 3, summary: "Factorisation, completing the square, quadratic formula, graphs" },
      { name: "Remainder & Factor Theorem", slug: "remainder-theorem", form: 3, summary: "Polynomial division, factorising cubics, remainder theorem" },
      { name: "Matrices", slug: "matrices1", form: 3, summary: "Matrix operations, determinants, inverse of 2×2 matrix" },
      { name: "Linear Programming", slug: "linear-programming", form: 3, summary: "Forming inequalities, feasible regions, objective function" },
      { name: "Trigonometry II", slug: "trig2", form: 3, summary: "Sine rule, cosine rule, area of triangle, 3D problems" },
      { name: "Commercial Arithmetic II", slug: "commercial2", form: 3, summary: "Simple & compound interest, depreciation, annuities, insurance" },
      { name: "Statistics I", slug: "stats1", form: 3, summary: "Mean, median, mode, frequency distribution tables, histograms, ogive" },
      { name: "Loci", slug: "loci", form: 3, summary: "Locus of a point, construction problems, regions" },
      { name: "Surds & Further Logarithms", slug: "surds", form: 3, summary: "Simplifying surds, rationalising denominators, log equations" },
      // ── Form 4 ──
      { name: "Matrices & Transformations", slug: "matrices-transform", form: 4, summary: "Transformations using matrices, combined transformations, inverse matrix" },
      { name: "Statistics II", slug: "stats2", form: 4, summary: "Standard deviation, quartiles, cumulative frequency, box plots" },
      { name: "Probability", slug: "probability", form: 4, summary: "Simple, combined events, tree diagrams, conditional probability" },
      { name: "Vectors", slug: "vectors", form: 4, summary: "Column vectors, position vectors, magnitude, midpoint, section formula" },
      { name: "Differentiation", slug: "differentiation", form: 4, summary: "dy/dx, gradient of curve, turning points, maxima & minima" },
      { name: "Integration", slug: "integration", form: 4, summary: "Indefinite & definite integrals, area under curve, kinematics" },
      { name: "Trigonometry III", slug: "trig3", form: 4, summary: "Bearings, angles of elevation & depression, 3D trigonometry" },
      { name: "Longitudes & Latitudes", slug: "longitudes-latitudes", form: 4, summary: "Great circles, small circles, distance on earth's surface" },
    ],
  },
  {
    name: "Biology",
    slug: "biology",
    icon: "🧬",
    paper: "Paper 1, 2 & 3",
    topics: [
      // ── Form 1 ──
      { name: "Introduction to Biology", slug: "intro-bio", form: 1, summary: "Characteristics of living things, branches of biology, biology apparatus" },
      { name: "Cell Structure & Organisation", slug: "cell-bio", form: 1, summary: "Plant & animal cells, organelles, tissues, organs, organ systems" },
      { name: "Classification of Living Things", slug: "classification", form: 1, summary: "Kingdoms, phyla, binomial nomenclature, keys" },
      { name: "Nutrition in Plants", slug: "nutrition-plants", form: 1, summary: "Photosynthesis, mineral salts, leaf structure, experiments" },
      { name: "Nutrition in Animals", slug: "nutrition-animals", form: 1, summary: "Digestion, enzymes, alimentary canal, food tests, absorption" },
      { name: "Transport in Plants", slug: "transport-plants", form: 1, summary: "Osmosis, xylem & phloem, transpiration, wilting" },
      { name: "Transport in Animals", slug: "transport-animals", form: 1, summary: "Blood composition, heart structure, circulatory system, blood groups" },
      { name: "Respiration", slug: "respiration", form: 1, summary: "Aerobic & anaerobic, respiratory quotient, breathing mechanism" },
      { name: "Excretion & Homeostasis", slug: "excretion", form: 1, summary: "Kidney structure, urine formation, skin, homeostasis" },
      // ── Form 2 ──
      { name: "Growth & Development", slug: "growth", form: 2, summary: "Growth curves, mitosis, cell cycle, differentiation" },
      { name: "Genetics I", slug: "genetics1", form: 2, summary: "DNA structure, chromosomes, Mendel's laws, Punnett squares, inheritance" },
      { name: "Evolution", slug: "evolution1", form: 2, summary: "Darwin's theory, evidence, natural selection, adaptation, speciation" },
      { name: "Ecology I", slug: "ecology1", form: 2, summary: "Ecosystem, food chains & webs, energy flow, sampling methods" },
      { name: "Support & Movement", slug: "support-movement", form: 2, summary: "Skeleton, joints, muscles, locomotion, support in plants" },
      { name: "Drugs & Their Effects", slug: "drugs", form: 2, summary: "Categories, effects of alcohol, tobacco, bhang on the body" },
      // ── Form 3 ──
      { name: "Coordination & Response", slug: "coordination", form: 3, summary: "Nervous system, brain, spinal cord, eye, ear, endocrine system, hormones" },
      { name: "Reproduction in Animals", slug: "reproduction-animals", form: 3, summary: "Reproductive systems, fertilisation, pregnancy, birth, family planning" },
      { name: "Reproduction in Plants", slug: "reproduction-plants", form: 3, summary: "Pollination, fertilisation, fruits, seeds, vegetative reproduction" },
      { name: "Genetics II", slug: "genetics2", form: 3, summary: "Sex determination, sex-linked traits, mutation, genetic diseases" },
      { name: "Ecology II", slug: "ecology2", form: 3, summary: "Populations, nutrient cycles, energy flow, human effects on environment" },
      // ── Form 4 ──
      { name: "Genetics III", slug: "genetics3", form: 4, summary: "Probability in genetics, co-dominance, multiple alleles, gene interaction" },
      { name: "Evolution II", slug: "evolution2", form: 4, summary: "Origin of life, Lamarck vs Darwin, human evolution, fossil evidence" },
      { name: "Ecology III", slug: "ecology3", form: 4, summary: "Conservation, pollution, pest control, agroforestry, environmental education" },
      { name: "Immunology", slug: "immunology", form: 4, summary: "Immunity types, vaccines, HIV/AIDS, diseases & their control" },
    ],
  },
  {
    name: "Chemistry",
    slug: "chemistry",
    icon: "⚗️",
    paper: "Paper 1, 2 & 3",
    topics: [
      // ── Form 1 ──
      { name: "Introduction to Chemistry", slug: "intro-chem", form: 1, summary: "Lab safety, apparatus, physical & chemical changes, mixtures" },
      { name: "Acids, Bases & Indicators", slug: "acids-bases1", form: 1, summary: "Properties of acids & bases, neutral solutions, pH, indicators" },
      { name: "Oxygen & Oxides", slug: "oxygen-oxides", form: 1, summary: "Preparation of oxygen, properties, types of oxides, combustion" },
      { name: "Water", slug: "water-chem", form: 1, summary: "Sources, hardness, treatment, electrolysis of water, water of crystallisation" },
      { name: "Carbon & Its Compounds", slug: "carbon", form: 1, summary: "Allotropes, carbon dioxide, carbon monoxide, carbonates, uses" },
      { name: "Periodic Table", slug: "periodic-table", form: 1, summary: "Groups, periods, Dobereiner's law, Newlands, Mendeleev, modern table" },
      // ── Form 2 ──
      { name: "Structure of the Atom", slug: "atomic-structure", form: 2, summary: "Protons, neutrons, electrons, electron configuration, isotopes" },
      { name: "Chemical Families", slug: "chemical-families", form: 2, summary: "Group I (alkali metals), Group VII (halogens), Group VIII (noble gases)" },
      { name: "The Mole Concept", slug: "mole-concept", form: 2, summary: "Molar mass, Avogadro's number, stoichiometry, percentage composition" },
      { name: "Electrochemistry I – Electrolysis", slug: "electrolysis1", form: 2, summary: "Electrolytes, electrodes, Faraday's laws, industrial electrolysis" },
      { name: "Salts", slug: "salts", form: 2, summary: "Preparation methods, solubility rules, qualitative analysis of anions & cations" },
      // ── Form 3 ──
      { name: "Energy Changes in Reactions", slug: "energy-changes", form: 3, summary: "Exothermic & endothermic, bond energies, Hess's law, entropy" },
      { name: "Rates of Reactions & Equilibrium", slug: "reaction-rates", form: 3, summary: "Factors affecting rate, Le Chatelier's principle, Kc expression" },
      { name: "Organic Chemistry I", slug: "organic-chem1", form: 3, summary: "Hydrocarbons: alkanes, alkenes, naming (IUPAC), reactions, petroleum" },
      { name: "Metals", slug: "metals", form: 3, summary: "Reactivity series, extraction of metals, rusting, alloys, uses" },
      { name: "Non-metals", slug: "non-metals", form: 3, summary: "Nitrogen, sulfur, halogens, uses, manufacturing (Haber, Contact processes)" },
      // ── Form 4 ──
      { name: "Organic Chemistry II", slug: "organic-chem2", form: 4, summary: "Alcohols, carboxylic acids, esters, proteins, carbohydrates, polymers" },
      { name: "Radioactivity", slug: "radioactivity", form: 4, summary: "Alpha, beta, gamma radiation, half-life, nuclear fission & fusion, applications" },
      { name: "Electrochemistry II – Cells", slug: "electrochemistry2", form: 4, summary: "Galvanic cells, standard electrode potentials, electrochemical series" },
      { name: "Air & Water Pollution", slug: "air-pollution", form: 4, summary: "Sources, effects, control, industrial chemistry, environmental chemistry" },
    ],
  },
  {
    name: "Physics",
    slug: "physics",
    icon: "⚡",
    paper: "Paper 1, 2 & 3",
    topics: [
      // ── Form 1 ──
      { name: "Introduction to Physics", slug: "intro-physics", form: 1, summary: "Measurement, SI units, significant figures, scientific notation, errors" },
      { name: "Forces", slug: "forces1", form: 1, summary: "Types of forces, resultant force, vectors, Newton's laws introduction" },
      { name: "Pressure", slug: "pressure", form: 1, summary: "Pressure in solids, liquids, gas pressure, Pascal's law, hydraulics, manometers" },
      { name: "Thermal Expansion", slug: "thermal-expansion", form: 1, summary: "Expansion of solids, liquids, gases; bimetallic strip; anomalous expansion of water" },
      { name: "Heat & Temperature", slug: "heat-temperature", form: 1, summary: "Thermometers, temperature scales, specific heat capacity, calorimetry" },
      { name: "Reflection of Light", slug: "light1", form: 1, summary: "Laws of reflection, plane mirrors, characteristics of images, periscope" },
      // ── Form 2 ──
      { name: "Magnetism", slug: "magnetism", form: 2, summary: "Properties, magnetic field lines, types of magnets, Earth's magnetic field" },
      { name: "Electricity I", slug: "electricity-basic", form: 2, summary: "Ohm's law, resistance, V-I graphs, series & parallel circuits, ammeters & voltmeters" },
      { name: "Turning Effect of Forces", slug: "turning-effects", form: 2, summary: "Moments, principle of moments, levers, clockwise & anticlockwise moments" },
      { name: "Equilibrium & Centre of Gravity", slug: "centre-gravity", form: 2, summary: "Types of equilibrium, centre of gravity, stability, toppling" },
      { name: "Reflection at Curved Mirrors", slug: "curved-mirrors", form: 2, summary: "Concave & convex mirrors, focal length, image formation, mirror formula" },
      { name: "Waves", slug: "waves", form: 2, summary: "Wave properties: amplitude, frequency, wavelength, speed; transverse & longitudinal" },
      { name: "Sound", slug: "sound", form: 2, summary: "Production, propagation, speed, echoes, resonance, Doppler effect" },
      // ── Form 3 ──
      { name: "Linear Motion", slug: "linear-motion", form: 3, summary: "Velocity, acceleration, equations of motion, velocity-time graphs, projectiles" },
      { name: "Newton's Laws of Motion", slug: "newtons-laws", form: 3, summary: "All 3 laws, momentum, impulse, conservation of momentum, collision types" },
      { name: "Work, Energy & Power", slug: "work-energy", form: 3, summary: "Work done, KE, PE, conservation of energy, power, machines & efficiency" },
      { name: "Heating Effect of Electric Current", slug: "heating-current", form: 3, summary: "Electrical power, energy, fuses, circuit breakers, domestic wiring" },
      { name: "Quantity of Heat", slug: "quantity-heat", form: 3, summary: "Specific heat capacity, latent heat, change of state, heating & cooling curves" },
      { name: "Gas Laws", slug: "gas-laws", form: 3, summary: "Boyle's law, Charles's law, Pressure law, ideal gas equation PV/T=nR" },
      // ── Form 4 ──
      { name: "Thin Lenses", slug: "thin-lenses", form: 4, summary: "Convex & concave lenses, lens formula 1/f=1/u+1/v, magnification, optical instruments" },
      { name: "Uniform Circular Motion", slug: "circular-motion", form: 4, summary: "Angular velocity, centripetal force, banking, satellites, orbital motion" },
      { name: "Floating & Sinking", slug: "floating-sinking", form: 4, summary: "Archimedes' principle, upthrust, density, Bernoulli effect, applications" },
      { name: "Electromagnetic Induction", slug: "electromagnetic", form: 4, summary: "Faraday's law, Lenz's law, generators, transformers, AC & DC" },
      { name: "Mains Electricity", slug: "mains-electricity", form: 4, summary: "AC vs DC, power transmission, safety, earthing, household electrical fittings" },
      { name: "Cathode Rays & X-Rays", slug: "cathode-rays", form: 4, summary: "CRT, properties of cathode rays, X-ray tube, uses & dangers of X-rays" },
      { name: "Photoelectric Effect", slug: "photoelectric", form: 4, summary: "Einstein's equation, work function, threshold frequency, photocell applications" },
      { name: "Radioactivity", slug: "radioactivity2", form: 4, summary: "Radioactive decay, half-life calculations, nuclear equations, fission & fusion, safety" },
    ],
  },
];

// PDF links for Made Familiar notes
const PDF_NOTES = {
  mathematics: "/notes/MATHS MADE FAMILIAR.pdf",
  biology: "/notes/BIOLOGY MADE FAMILIAR.pdf",
  chemistry: "/notes/CHEM MADE FAMILIAR.pdf",
  physics: "/notes/PHYSICS MADE FAMILIAR.pdf",
};

async function main() {
  console.log("🌱 Seeding KCSE Mastery database...\n");

  // Clear existing data
  await prisma.userProgress.deleteMany();
  await prisma.markingScheme.deleteMany();
  await prisma.question.deleteMany();
  await prisma.studyNote.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.studySession.deleteMany();
  await prisma.streak.deleteMany();
  await prisma.user.deleteMany();

  // Create a default student user
  const student = await prisma.user.create({
    data: {
      name: "Student",
      email: "student@zerohero.app",
      role: "STUDENT",
    },
  });
  console.log(`👤 Created student: ${student.name}`);

  // Create an admin user
  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@zerohero.app",
      role: "ADMIN",
    },
  });
  console.log(`👤 Created admin: ${admin.name}`);

  // Seed subjects and topics
  for (const subjectData of SUBJECTS) {
    const subject = await prisma.subject.create({
      data: {
        name: subjectData.name,
        slug: subjectData.slug,
        icon: subjectData.icon,
        paper: subjectData.paper,
      },
    });
    console.log(`\n📚 ${subject.icon} ${subject.name}`);

    for (const topicData of subjectData.topics) {
      const topic = await prisma.topic.create({
        data: {
          name: topicData.name,
          slug: topicData.slug,
          form: topicData.form,
          summary: topicData.summary,
          subjectId: subject.id,
        },
      });

      // Link Made Familiar PDF as a study note for each topic
      if (PDF_NOTES[subjectData.slug]) {
        await prisma.studyNote.create({
          data: {
            topicId: topic.id,
            title: `${subjectData.name} Made Familiar — ${topicData.name}`,
            content: `Refer to the Made Familiar PDF for comprehensive notes on **${topicData.name}**.`,
            pdfUrl: PDF_NOTES[subjectData.slug],
            sortOrder: 0,
          },
        });
      }

      console.log(`   Form ${topicData.form}: ${topicData.name}`);
    }
  }

  // Count totals
  const subjectCount = await prisma.subject.count();
  const topicCount = await prisma.topic.count();
  const noteCount = await prisma.studyNote.count();

  console.log(`\n✅ Seeding complete!`);
  console.log(`   📚 ${subjectCount} subjects`);
  console.log(`   📖 ${topicCount} topics`);
  console.log(`   📝 ${noteCount} study notes linked`);
  console.log(`   👤 2 users (1 student, 1 admin)\n`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
