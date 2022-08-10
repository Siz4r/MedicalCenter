import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { Research } from './types'
import {
  addResearch,
  deleteAllResearches,
  deleteResearch,
  updateOrderResearchResult,
  updateResearch,
  getResearches,
} from './api'

interface researchSliceState {
  researches: Research[]
  isLoading: boolean
}

const initialState: researchSliceState = {
  researches: [],
  isLoading: false,
}

export const researchSlice = createSlice({
  name: 'researches',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addResearch.fulfilled, (state, action) => {
      state.researches = [...state.researches, { ...action.meta.arg, id: action.payload, orderResearches: [] }]
    })
    builder.addCase(getResearches.fulfilled, (state, action) => {
      state.researches = action.payload
    })
    builder.addCase(deleteResearch.fulfilled, (state, action) => {
      state.researches = state.researches.filter(r => r.id !== action.meta.arg)
    })
    builder.addCase(deleteAllResearches.fulfilled, (state, action) => {
      state.researches = state.researches.filter(r => !action.meta.arg.includes(r.id))
    })

    builder.addCase(updateResearch.fulfilled, (state, action) => {
      const args = action.meta.arg
      state.researches = state.researches.map(r => {
        if (r.id == args.id) {
          return {
            ...r,
            id: r.id,
            name: args.name,
            description: args.description,
          }
        } else return r
      })
    })

    builder.addCase(updateOrderResearchResult.fulfilled, (state, action) => {
      const args = action.meta.arg

      state.researches = state.researches.map(r => {
        if (r.id === args.researchId) {
          r.orderResearches = r.orderResearches.map(o => {
            if (o.id === args.id) {
              o.result = args.result
            }
            return o
          })
        }
        return r
      })
    })

    builder.addMatcher(
      isAnyOf(
        addResearch.pending,
        getResearches.pending,
        deleteResearch.pending,
        deleteAllResearches.pending,
        updateResearch.pending
      ),
      state => {
        state.isLoading = true
      }
    )

    builder.addMatcher(
      isAnyOf(
        addResearch.fulfilled,
        addResearch.rejected,
        getResearches.fulfilled,
        getResearches.rejected,
        deleteResearch.fulfilled,
        deleteResearch.rejected,
        deleteAllResearches.fulfilled,
        deleteAllResearches.rejected,
        updateResearch.fulfilled,
        updateResearch.rejected
      ),
      state => {
        state.isLoading = false
      }
    )
  },
})
