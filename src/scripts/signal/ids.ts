/** Formation order shared by the DOM (data-formation) and the GPU texture layout. */
export const FORMATIONS = [
  'core',
  'wave',
  'data',
  'auth',
  'backend',
  'interface',
  'ai',
  'production',
  'field',
  'point',
] as const;

export type FormationId = (typeof FORMATIONS)[number];

export const formationIndex = (id: string | undefined): number => {
  const i = FORMATIONS.indexOf(id as FormationId);
  return i < 0 ? FORMATIONS.indexOf('field') : i;
};
