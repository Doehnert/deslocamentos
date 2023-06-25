import React from "react"
import { Box } from "@mui/material"
import CircularProgress from "@mui/material/CircularProgress"
import { useIsFetching, useIsMutating } from "react-query"

export function Loading() {
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  const display = isFetching || isMutating ? "inherit" : "none"

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <CircularProgress
        sx={{ position: "fixed", top: "50%", display: display }}
      />
    </Box>
  )
}
