const data = [
  {
    id: 1,
    city: 'Asuncion',
    color: 'red',
    coordinates: [-25.30066, -57.63591],
    value: 50
  },
  {
    id: 2,
    city: 'New York',
    color: 'blue',
    coordinates: [40.73061, -73.935242],
    value: 25
  },
  {
    id: 3,
    city: 'San Francisco',
    color: 'orange',
    coordinates: [37.773972, -122.431297],
    value: 35
  },
  {
    id: 4,
    city: 'Beijing',
    color: 'gold',
    coordinates: [39.9042, 116.4074],
    value: 0
  },
  {
    id: 5,
    city: 'London',
    color: 'green',
    coordinates: [51.5074, 0.1278],
    value: 80
  },
  {
    id: 6,
    city: 'San Lorenzo',
    color: 'green',
    coordinates: [-25.30066, -58.63591],
    value: 80
  }
]

const getRandomInRange = (from, to, fixed) => {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1
}

const getRandomColor = () => {
  const data = ['red', 'blue', 'orange', 'gold', 'green']
  return data[Math.floor(Math.random() * data.length - 1) + 1]
}

const getRandomCityName = () => {
  const data = [
    'Asuncion',
    'New York',
    'San Francisco',
    'Beijing',
    'London',
    'Lorenzo'
  ]
  return data[Math.floor(Math.random() * data.length - 1) + 1]
}
let id = 0
const getNextId = () => {
  return id++
}

const generateLocation = () => {
  return {
    id: getNextId(),
    city: getRandomCityName(),
    color: getRandomColor(),
    coordinates: [
      getRandomInRange(-180, 180, 3),
      getRandomInRange(-180, 180, 3)
    ],
    value: 80
  }
}

module.exports = nr => {
  if (nr < 5) {
    return data[nr]
  } else {
    return generateLocation()
  }
}
