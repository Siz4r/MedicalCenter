import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { Research } from './types'
import { createResearch, deleteAllResearchesByIds, deleteResearchById, editResearch, getResearches } from './api'

interface researchSliceState {
  researches: Research[]
  isLoading: boolean
}

const initialState: researchSliceState = {
  researches: [],
  isLoading: false,
}

export const researchSlice = createSlice({
  name: 'reseaches',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createResearch.fulfilled, (state, action) => {
      state.researches = [...state.researches, { ...action.meta.arg, id: action.payload, orderResearches: [] }]
    })
    builder.addCase(getResearches.fulfilled, (state, action) => {
      state.researches = action.payload
    })
    builder.addCase(deleteResearchById.fulfilled, (state, action) => {
      state.researches = state.researches.filter(r => r.id !== action.meta.arg)
    })
    builder.addCase(deleteAllResearchesByIds.fulfilled, (state, action) => {
      state.researches = state.researches.filter(r => !action.meta.arg.includes(r.id))
    })

    builder.addCase(editResearch.fulfilled, (state, action) => {
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

    builder.addMatcher(
      isAnyOf(
        createResearch.pending,
        getResearches.pending,
        deleteResearchById.pending,
        deleteAllResearchesByIds.pending,
        editResearch.pending
      ),
      state => {
        state.isLoading = true
      }
    )

    builder.addMatcher(
      isAnyOf(
        createResearch.fulfilled,
        createResearch.rejected,
        getResearches.fulfilled,
        getResearches.rejected,
        deleteResearchById.fulfilled,
        deleteResearchById.rejected,
        deleteAllResearchesByIds.fulfilled,
        deleteAllResearchesByIds.rejected,
        editResearch.fulfilled,
        editResearch.rejected
      ),
      state => {
        state.isLoading = false
      }
    )
  },
})
