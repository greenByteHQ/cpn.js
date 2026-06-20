/**
 * Utility functions for CPNs.
 */

import type { Marking} from './types';
import type { NetLike } from './net-types.js';
import { EMPTY_MULTISET, type Multiset, countTokensInMultiset } from './multiset.js';




/**
 * Renders current net as a Graphwiz dot representation.
 * @param net The net to render.
 * @param marking The current marking
 * @returns A string containing the dot representation of the net.
 */
export function renderNetAsDot(net: NetLike, marking: Marking): string {
  const placeLines = Array.from(net.places).map(p => {
    const tokenCount = countTokensInMultiset(marking.get(p[0]) || EMPTY_MULTISET);
    return `  "${p[0]}" [label="${p[0]}\\n(${tokenCount})", shape=circle]`;
  });
  const transitionLines = Array.from(net.transitions).map(t => {
    return `  "${t[0]}" [shape=rectangle]`;
  });
  const arcLines = Array.from(net.arcs).map(a => {
    const label = `[label="${a[1].inscription}"]`;
    return `  "${a[1].sourceId}" -> "${a[1].targetId}" ${label}`;
  });
  return `digraph CPN {\n${[...placeLines, ...transitionLines, ...arcLines].join(';\n')}\n}`;
}

/**
 * Fetches the total number of tokens in a marking.
 * @param marking The marking to count tokens in.
 * @returns The total number of tokens in the marking.
 */
export function countTokens(marking: Marking|undefined): number {
    let count = 0;
    if (!marking) return count;
    for (const ms of marking.values()) {
        for (const c of ms.values()) {
        count += c;
        }
    }
    return count;
}
