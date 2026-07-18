// Category vocabulary (layer 2): the fixed set of body parts, muscles and
// equipment values that appear in the dataset. English is the source, so
// only Spanish needs a table; translateTerm() falls back to the raw value
// for anything unmapped.
const es = {
  // body parts
  back: "espalda",
  cardio: "cardio",
  chest: "pecho",
  "lower arms": "antebrazos",
  "lower legs": "pantorrillas",
  neck: "cuello",
  shoulders: "hombros",
  "upper arms": "brazos",
  "upper legs": "piernas",
  waist: "abdomen",
  // muscles (target + secondary)
  abdominals: "abdominales",
  abductors: "abductores",
  adductors: "aductores",
  biceps: "bíceps",
  calves: "gemelos",
  forearms: "antebrazos",
  glutes: "glúteos",
  hamstrings: "isquiotibiales",
  lats: "dorsales",
  "lower back": "zona lumbar",
  "middle back": "espalda media",
  quadriceps: "cuádriceps",
  traps: "trapecios",
  triceps: "tríceps",
  // equipment
  bands: "bandas",
  barbell: "barra",
  "body only": "solo el cuerpo",
  cable: "polea",
  dumbbell: "mancuerna",
  "e-z curl bar": "barra Z",
  "exercise ball": "pelota de ejercicio",
  "foam roll": "rodillo de espuma",
  kettlebells: "pesas rusas",
  machine: "máquina",
  "medicine ball": "balón medicinal",
  other: "otro",
};

const tables = { es };

export const translateTerm = (value, lang) => {
  if (lang === "en" || !value) return value;
  return tables[lang]?.[value] ?? value;
};
