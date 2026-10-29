// ─────────────────────────────────────────────────────────────
// REPORTS — categories, statuses and simulated seed reports.
// Seed timestamps are relative to when the demo data is created
// (or reset), so they always look recent during testing.
// The text of the sample reports is under `seed` in lang/en.js
// (stored in English) and lang/ms.js (shown when BM is on).
// ─────────────────────────────────────────────────────────────

import en from './lang/en.js'
import { text } from '../i18n.js'

const CATEGORY_IDS = ['overflow', 'missed', 'dumping', 'bulky', 'drain', 'stagnant', 'other']

/** Report categories in the current language. */
export function categoryList() {
  return CATEGORY_IDS.map((id) => ({ id, ...text('categories', id) }))
}

export function categoryById(id) {
  return CATEGORY_IDS.includes(id) ? { id, ...text('categories', id) } : undefined
}

// Statuses and assignees are stored as these English values; tl() in i18n.js shows them translated.
export const STATUSES = ['Submitted', 'Under review', 'Resolved']

export const ASSIGNEES = Object.values(en.assignees)

const H = 3600 * 1000

function seed(now) {
  const t = (hoursAgo) => now - hoursAgo * H
  return [
    {
      id: 'WW-0107',
      description: en.seed['WW-0107'].description,
      mine: true,
      category: 'overflow',
      block: 'b6',
      spot: en.spots.binCentre,
      photo: 'sample:overflow',
      assignee: en.assignees.none,
      history: [{ status: 'Submitted', at: t(5), note: en.seed['WW-0107'].notes[0] }],
    },
    {
      id: 'WW-0104',
      description: en.seed['WW-0104'].description,
      mine: true,
      category: 'stagnant',
      block: 'b6',
      spot: en.spots.playground,
      photo: null,
      assignee: en.assignees.jmb,
      history: [
        { status: 'Submitted', at: t(52), note: en.seed['WW-0104'].notes[0] },
        { status: 'Under review', at: t(30), note: en.seed['WW-0104'].notes[1] },
        { status: 'Resolved', at: t(8), note: en.seed['WW-0104'].notes[2] },
      ],
    },
    {
      id: 'WW-0106',
      description: en.seed['WW-0106'].description,
      mine: false,
      category: 'dumping',
      block: 'b9',
      spot: en.spots.roadside,
      photo: 'sample:dumping',
      assignee: en.assignees.mbpj,
      history: [
        { status: 'Submitted', at: t(20), note: en.seed['WW-0106'].notes[0] },
        { status: 'Under review', at: t(14), note: en.seed['WW-0106'].notes[1] },
      ],
    },
    {
      id: 'WW-0105',
      description: en.seed['WW-0105'].description,
      mine: false,
      category: 'bulky',
      block: 'b2',
      spot: en.spots.liftLobby,
      photo: null,
      assignee: en.assignees.none,
      history: [{ status: 'Submitted', at: t(28), note: en.seed['WW-0105'].notes[0] }],
    },
    {
      id: 'WW-0103',
      description: en.seed['WW-0103'].description,
      mine: false,
      category: 'drain',
      block: 'b5',
      spot: en.spots.drain,
      photo: 'sample:drain',
      assignee: en.assignees.jmb,
      history: [
        { status: 'Submitted', at: t(70), note: en.seed['WW-0103'].notes[0] },
        { status: 'Under review', at: t(60), note: en.seed['WW-0103'].notes[1] },
      ],
    },
    {
      id: 'WW-0102',
      description: en.seed['WW-0102'].description,
      mine: false,
      category: 'missed',
      block: 'b10',
      spot: en.spots.binCentre,
      photo: null,
      assignee: en.assignees.contractor,
      history: [
        { status: 'Submitted', at: t(100), note: en.seed['WW-0102'].notes[0] },
        { status: 'Under review', at: t(96), note: en.seed['WW-0102'].notes[1] },
        { status: 'Resolved', at: t(80), note: en.seed['WW-0102'].notes[2] },
      ],
    },
    {
      id: 'WW-0101',
      description: en.seed['WW-0101'].description,
      mine: false,
      category: 'overflow',
      block: 'b3',
      spot: en.spots.binCentre,
      photo: null,
      assignee: en.assignees.contractor,
      history: [
        { status: 'Submitted', at: t(150), note: en.seed['WW-0101'].notes[0] },
        { status: 'Resolved', at: t(130), note: en.seed['WW-0101'].notes[1] },
      ],
    },
  ]
}

export function createSeedState(now = Date.now()) {
  return {
    version: 1,
    myBlock: 'b6',
    nextSeq: 108,
    reports: seed(now),
  }
}

export function statusOf(report) {
  return report.history[report.history.length - 1].status
}

export function createdAt(report) {
  return report.history[0].at
}

export function updatedAt(report) {
  return report.history[report.history.length - 1].at
}
