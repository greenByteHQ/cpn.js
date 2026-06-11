/**
 * Minimal structural interfaces for standard CPN net elements used by the engine.
 */

// ─── Net element interfaces ───────────────────────────────────────────────────

/** Minimal place shape. The engine only needs stable place ids. */
export interface Place {
  readonly id: string;
}

export enum InterpreterLanguage {
  SML = 'sml',
  Python = 'python',
  JS = 'js',
}

export interface Transition {
  readonly id: string;
  readonly guard: string;
  readonly guardLang?: InterpreterLanguage;
}

/** Arc shape for standard PT/TP CPN arcs. */
export interface Arc {
  readonly id: string;
  readonly kind: 'PT' | 'TP';
  readonly sourceId: string;
  readonly targetId: string;
  readonly inscription: string;
  readonly inscriptionLang?: InterpreterLanguage;
  readonly readArcGroupId?: string;
}

export type NetLike = {
  readonly places: ReadonlyMap<string, Place>;
  readonly transitions: ReadonlyMap<string, Transition>;
  readonly arcs: ReadonlyMap<string, Arc>;
};
