// Local exercise database adapter.
//
// Exercise data comes from the public-domain free-exercise-db dataset
// (https://github.com/yuhonas/free-exercise-db), bundled at
// `src/data/exercises.json`. This module maps its schema onto the shape the
// UI components already consume (`bodyPart`, `target`, `equipment`,
// `gifUrl`, ...), so the rest of the app is agnostic of the source change.

const IMAGE_BASE =
  "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/";

// free-exercise-db classifies by muscle; the UI groups by body part.
const MUSCLE_TO_BODY_PART = {
  lats: "back",
  "lower back": "back",
  "middle back": "back",
  traps: "back",
  biceps: "upper arms",
  triceps: "upper arms",
  forearms: "lower arms",
  quadriceps: "upper legs",
  hamstrings: "upper legs",
  glutes: "upper legs",
  abductors: "upper legs",
  adductors: "upper legs",
  calves: "lower legs",
  abdominals: "waist",
  chest: "chest",
  shoulders: "shoulders",
  neck: "neck",
};

const toAppShape = (exercise) => {
  const target = exercise.primaryMuscles[0] ?? exercise.category;
  return {
    id: exercise.id,
    name: exercise.name,
    bodyPart:
      exercise.category === "cardio"
        ? "cardio"
        : (MUSCLE_TO_BODY_PART[target] ?? exercise.category),
    target,
    equipment: exercise.equipment ?? "body only",
    gifUrl: `${IMAGE_BASE}${exercise.images[0]}`,
    // every exercise ships two photos: start + end position of the movement
    imageUrls: exercise.images.map((image) => `${IMAGE_BASE}${image}`),
    instructions: exercise.instructions,
    secondaryMuscles: exercise.secondaryMuscles,
  };
};

// Lazily import the ~1MB dataset so it lands in its own chunk instead of the
// main bundle, and map it once; subsequent calls reuse the cached promise.
let basePromise = null;

const getBaseExercises = () => {
  basePromise ??= import("../data/exercises.json").then((module) =>
    module.default.map(toAppShape),
  );
  return basePromise;
};

// Layer 3 (i18n): exercises.json is English-only. exercises.es.json is an
// override map { id: { name, instructions } } — only ids present there get
// translated content; everything else falls back to English. The Spanish
// list is memoized per-language so we build it at most once.
const localizedPromises = { en: null };

const getSpanishOverrides = () =>
  import("../data/exercises.es.json")
    .then((module) => module.default)
    .catch(() => ({}));

const getLocalizedExercises = (lang) => {
  if (lang !== "es") return getBaseExercises();
  localizedPromises.es ??= Promise.all([
    getBaseExercises(),
    getSpanishOverrides(),
  ]).then(([exercises, overrides]) =>
    exercises.map((exercise) => {
      const override = overrides[exercise.id];
      return override ? { ...exercise, ...override } : exercise;
    }),
  );
  return localizedPromises.es;
};

// lang defaults to "en" so existing/untranslated call sites keep working.
export const getExercises = (lang = "en") => getLocalizedExercises(lang);

export const getExercisesByBodyPart = async (bodyPart, lang = "en") => {
  const exercises = await getExercises(lang);
  return exercises.filter((exercise) => exercise.bodyPart === bodyPart);
};

export const getBodyPartList = async () => {
  // body parts come from a fixed vocabulary translated in the UI layer, so
  // this always reads the (cheaper) English base
  const exercises = await getBaseExercises();
  return [...new Set(exercises.map((exercise) => exercise.bodyPart))].sort();
};

export const getExerciseById = async (id, lang = "en") => {
  const exercises = await getExercises(lang);
  return exercises.find((exercise) => exercise.id === id) ?? null;
};

export const getExercisesByTarget = async (target, lang = "en") => {
  const exercises = await getExercises(lang);
  return exercises.filter((exercise) => exercise.target === target);
};

export const getExercisesByEquipment = async (equipment, lang = "en") => {
  const exercises = await getExercises(lang);
  return exercises.filter((exercise) => exercise.equipment === equipment);
};
