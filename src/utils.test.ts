import { describe, it, expect } from 'vitest';
import { renderNetAsDot } from './utils';
import type { NetLike, Place, Transition } from './net-types';
import type { Marking } from './types';
import { valueToMultiset } from './multiset';
import { fire, fireRandomBinding } from './engine';

describe('renderNetAsDot', () => {
    const net = {
      places: new Map([
        ['p1', { id: 'p1' }],
        ['p2', { id: 'p2' }]
      ]),
      transitions: new Map([
        ['t1', { id: 't1', guard: '' }],
      ]),
      arcs: new Map([
        ['p1-to-t1', {
            id: 'p1-to-t',
            kind: 'PT',
            sourceId: 'p1',
            targetId: 't1',
            inscription: 'a',
        }],
        ['t1-to-p2', {
            id: 't-to-p2',
            kind: 'TP',
            sourceId: 't1',
            targetId: 'p2',
            inscription: 'a',
        }],
      ])
    } as NetLike;
    const marking = new Map([['p1', valueToMultiset("()",2)], ['p2', valueToMultiset("()",0)]]) as Marking;
  
    it('renders a simple net correctly', () => {
        const expectedDot = `digraph CPN {\n  "p1" [label="p1\\n(2)", shape=circle];\n  "p2" [label="p2\\n(0)", shape=circle];\n  "t1" [shape=rectangle];\n  "p1" -> "t1" [label="a"];\n  "t1" -> "p2" [label="a"]\n}`;
        const res = renderNetAsDot(net, marking);
        console.log(res);
        expect(res).toBe(expectedDot);
    });


    it('renders a simple net correctly after fire', async () => {
        const newMarking = await fireRandomBinding(net, marking);
        const expectedDot = `digraph CPN {\n  "p1" [label="p1\\n(1)", shape=circle];\n  "p2" [label="p2\\n(1)", shape=circle];\n  "t1" [shape=rectangle];\n  "p1" -> "t1" [label="a"];\n  "t1" -> "p2" [label="a"]\n}`;
        const res = renderNetAsDot(net, newMarking);
        console.log(res);
        expect(res).toBe(expectedDot);
    });


});