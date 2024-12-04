export async function getFeedbackCount(startTime: string, endTime: string) {
  const response = await fetch('https://e72e-49-36-188-218.ngrok-free.app/getCount', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filter: {
        name: 'get_feedback_count',
        startTime,
        endTime,
      },
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch feedback count')
  }

  return response.json()
}

export async function getFeedbackTopics(startTime: string, endTime: string) {
  const response = await fetch('https://e72e-49-36-188-218.ngrok-free.app/getCount', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filter: {
        name: 'get_feedback_topics',
        startTime,
        endTime,
      },
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch feedback topics')
  }

  return response.json()
}

export async function getDeflectionCount(startTime: string, endTime: string) {
  const response = await fetch('https://e72e-49-36-188-218.ngrok-free.app/getCount', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filter: {
        name: 'get_deflection_count',
        startTime,
        endTime,
      },
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch deflection count')
  }

  return response.json()
}

export async function getDeflectionTopics(startTime: string, endTime: string) {
  const response = await fetch('https://e72e-49-36-188-218.ngrok-free.app/getCount', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filter: {
        name: 'get_deflection_topics',
        startTime,
        endTime,
      },
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch deflection topics')
  }

  return response.json()
}

export async function getSurveyCount(startTime: string, endTime: string) {
  const response = await fetch('https://e72e-49-36-188-218.ngrok-free.app/getCount', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filter: {
        name: 'get_survey_count',
        startTime,
        endTime,
      },
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch survey count')
  }

  return response.json()
}

export async function getSurveyTopics(startTime: string, endTime: string) {
  const response = await fetch('https://e72e-49-36-188-218.ngrok-free.app/getCount', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filter: {
        name: 'get_survey_topics',
        startTime,
        endTime,
      },
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch survey topics')
  }

  return response.json()
}

