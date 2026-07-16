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
let exercisesPromise = null;

export const getExercises = () => {
  exercisesPromise ??= import("../data/exercises.json").then((module) =>
    module.default.map(toAppShape),
  );
  return exercisesPromise;
};

export const getExercisesByBodyPart = async (bodyPart) => {
  const exercises = await getExercises();
  return exercises.filter((exercise) => exercise.bodyPart === bodyPart);
};

export const getBodyPartList = async () => {
  const exercises = await getExercises();
  return [...new Set(exercises.map((exercise) => exercise.bodyPart))].sort();
};

export const getExerciseById = async (id) => {
  const exercises = await getExercises();
  return exercises.find((exercise) => exercise.id === id) ?? null;
};

export const getExercisesByTarget = async (target) => {
  const exercises = await getExercises();
  return exercises.filter((exercise) => exercise.target === target);
};

export const getExercisesByEquipment = async (equipment) => {
  const exercises = await getExercises();
  return exercises.filter((exercise) => exercise.equipment === equipment);
};
