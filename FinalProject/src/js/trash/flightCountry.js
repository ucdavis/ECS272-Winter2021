import embed from 'vega-embed'

export function flightCountry(id, width = 400, height = 300){
    let spec = {
        "vconcat": [
            {
              "mark": {
                "type": "line"
              },
              "data": {
                "values": [
                  {
                    "": 1,
                    "date": "2020-01-01T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 4,
                    "perc": 2
                  },
                  {
                    "": 2,
                    "date": "2020-01-02T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 3,
                    "date": "2020-01-03T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 4,
                    "date": "2020-01-04T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 5,
                    "date": "2020-01-05T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 6,
                    "date": "2020-01-07T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 7,
                    "date": "2020-01-08T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 8,
                    "date": "2020-01-09T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 9,
                    "date": "2020-01-11T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 10,
                    "date": "2020-01-12T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 11,
                    "date": "2020-01-13T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 12,
                    "date": "2020-01-14T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 13,
                    "date": "2020-01-15T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 4,
                    "perc": 2
                  },
                  {
                    "": 14,
                    "date": "2020-01-16T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 15,
                    "date": "2020-01-17T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 16,
                    "date": "2020-01-18T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 17,
                    "date": "2020-01-23T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 18,
                    "date": "2020-01-24T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 19,
                    "date": "2020-01-26T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 20,
                    "date": "2020-01-27T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 21,
                    "date": "2020-01-29T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 22,
                    "date": "2020-01-31T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 23,
                    "date": "2020-02-02T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 24,
                    "date": "2020-02-03T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 25,
                    "date": "2020-02-04T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 26,
                    "date": "2020-02-05T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 27,
                    "date": "2020-02-06T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 28,
                    "date": "2020-02-07T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 29,
                    "date": "2020-02-08T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 30,
                    "date": "2020-02-10T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 31,
                    "date": "2020-02-11T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 32,
                    "date": "2020-02-12T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 4,
                    "perc": 2
                  },
                  {
                    "": 33,
                    "date": "2020-02-13T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 34,
                    "date": "2020-02-15T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 4,
                    "perc": 2
                  },
                  {
                    "": 35,
                    "date": "2020-02-16T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 36,
                    "date": "2020-02-17T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 37,
                    "date": "2020-02-18T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 38,
                    "date": "2020-02-19T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 39,
                    "date": "2020-02-20T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 4,
                    "perc": 2
                  },
                  {
                    "": 40,
                    "date": "2020-02-21T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 41,
                    "date": "2020-02-23T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 42,
                    "date": "2020-02-24T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 43,
                    "date": "2020-02-25T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 44,
                    "date": "2020-02-26T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 4,
                    "perc": 2
                  },
                  {
                    "": 45,
                    "date": "2020-02-27T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 46,
                    "date": "2020-02-28T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 4,
                    "perc": 2
                  },
                  {
                    "": 47,
                    "date": "2020-02-29T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 48,
                    "date": "2020-03-01T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 49,
                    "date": "2020-03-02T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 50,
                    "date": "2020-03-04T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 51,
                    "date": "2020-03-06T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 52,
                    "date": "2020-03-07T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 53,
                    "date": "2020-03-08T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 54,
                    "date": "2020-03-09T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 55,
                    "date": "2020-03-12T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 56,
                    "date": "2020-03-15T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 57,
                    "date": "2020-03-17T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 58,
                    "date": "2020-03-19T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 59,
                    "date": "2020-03-20T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 60,
                    "date": "2020-03-21T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 61,
                    "date": "2020-03-24T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 62,
                    "date": "2020-03-25T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 63,
                    "date": "2020-03-26T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 64,
                    "date": "2020-03-29T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 65,
                    "date": "2020-03-30T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 66,
                    "date": "2020-03-31T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 67,
                    "date": "2020-04-11T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 68,
                    "date": "2020-04-12T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 69,
                    "date": "2020-04-16T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 70,
                    "date": "2020-04-22T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 71,
                    "date": "2020-04-23T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 72,
                    "date": "2020-04-24T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 73,
                    "date": "2020-04-25T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 74,
                    "date": "2020-04-26T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 75,
                    "date": "2020-04-27T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 76,
                    "date": "2020-04-29T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 77,
                    "date": "2020-05-02T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 78,
                    "date": "2020-05-06T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 79,
                    "date": "2020-05-10T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 80,
                    "date": "2020-05-13T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 81,
                    "date": "2020-05-17T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 82,
                    "date": "2020-05-22T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 83,
                    "date": "2020-05-24T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 84,
                    "date": "2020-05-30T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 85,
                    "date": "2020-05-31T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 86,
                    "date": "2020-06-01T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 87,
                    "date": "2020-06-02T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 88,
                    "date": "2020-06-03T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 89,
                    "date": "2020-06-05T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 90,
                    "date": "2020-06-07T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 91,
                    "date": "2020-06-09T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 92,
                    "date": "2020-06-10T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 93,
                    "date": "2020-06-13T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 94,
                    "date": "2020-06-14T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 95,
                    "date": "2020-06-15T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 96,
                    "date": "2020-06-16T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 97,
                    "date": "2020-06-17T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 98,
                    "date": "2020-06-20T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 99,
                    "date": "2020-06-21T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 100,
                    "date": "2020-06-22T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 101,
                    "date": "2020-06-23T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 102,
                    "date": "2020-06-24T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 103,
                    "date": "2020-06-25T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 104,
                    "date": "2020-06-26T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 105,
                    "date": "2020-06-27T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 106,
                    "date": "2020-06-28T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 107,
                    "date": "2020-06-29T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 108,
                    "date": "2020-07-09T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 109,
                    "date": "2020-07-11T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 110,
                    "date": "2020-07-16T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 111,
                    "date": "2020-07-17T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 112,
                    "date": "2020-07-18T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 113,
                    "date": "2020-07-19T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 114,
                    "date": "2020-07-21T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 5,
                    "perc": 2.5
                  },
                  {
                    "": 115,
                    "date": "2020-07-22T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 4,
                    "perc": 2
                  },
                  {
                    "": 116,
                    "date": "2020-07-24T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 4,
                    "perc": 2
                  },
                  {
                    "": 117,
                    "date": "2020-07-25T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 118,
                    "date": "2020-01-01T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 44,
                    "perc": 1.51724137931034
                  },
                  {
                    "": 119,
                    "date": "2020-01-02T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 55,
                    "perc": 1.89655172413793
                  },
                  {
                    "": 120,
                    "date": "2020-01-03T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 12,
                    "perc": 0.413793103448276
                  },
                  {
                    "": 121,
                    "date": "2020-01-04T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 41,
                    "perc": 1.41379310344828
                  },
                  {
                    "": 122,
                    "date": "2020-01-05T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 20,
                    "perc": 0.689655172413793
                  },
                  {
                    "": 123,
                    "date": "2020-01-06T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 10,
                    "perc": 0.344827586206897
                  },
                  {
                    "": 124,
                    "date": "2020-01-07T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 21,
                    "perc": 0.724137931034483
                  },
                  {
                    "": 125,
                    "date": "2020-01-08T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 39,
                    "perc": 1.3448275862069
                  },
                  {
                    "": 126,
                    "date": "2020-01-09T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 67,
                    "perc": 2.31034482758621
                  },
                  {
                    "": 127,
                    "date": "2020-01-10T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 58,
                    "perc": 2
                  },
                  {
                    "": 128,
                    "date": "2020-01-11T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 18,
                    "perc": 0.620689655172414
                  },
                  {
                    "": 129,
                    "date": "2020-01-12T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 31,
                    "perc": 1.06896551724138
                  },
                  {
                    "": 130,
                    "date": "2020-01-13T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 53,
                    "perc": 1.82758620689655
                  },
                  {
                    "": 131,
                    "date": "2020-01-14T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 52,
                    "perc": 1.79310344827586
                  },
                  {
                    "": 132,
                    "date": "2020-01-15T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 33,
                    "perc": 1.13793103448276
                  },
                  {
                    "": 133,
                    "date": "2020-01-16T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 21,
                    "perc": 0.724137931034483
                  },
                  {
                    "": 134,
                    "date": "2020-01-17T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 3,
                    "perc": 0.103448275862069
                  },
                  {
                    "": 135,
                    "date": "2020-01-18T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 1,
                    "perc": 0.0344827586206897
                  },
                  {
                    "": 136,
                    "date": "2020-01-19T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 1,
                    "perc": 0.0344827586206897
                  },
                  {
                    "": 137,
                    "date": "2020-01-20T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 18,
                    "perc": 0.620689655172414
                  },
                  {
                    "": 138,
                    "date": "2020-01-21T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 29,
                    "perc": 1
                  },
                  {
                    "": 139,
                    "date": "2020-01-22T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 9,
                    "perc": 0.310344827586207
                  },
                  {
                    "": 140,
                    "date": "2020-01-24T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 1,
                    "perc": 0.0344827586206897
                  },
                  {
                    "": 141,
                    "date": "2020-01-25T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 131,
                    "perc": 4.51724137931035
                  },
                  {
                    "": 142,
                    "date": "2020-01-26T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 34,
                    "perc": 1.17241379310345
                  },
                  {
                    "": 143,
                    "date": "2020-01-27T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 129,
                    "perc": 4.44827586206897
                  },
                  {
                    "": 144,
                    "date": "2020-01-28T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 21,
                    "perc": 0.724137931034483
                  },
                  {
                    "": 145,
                    "date": "2020-01-29T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 78,
                    "perc": 2.68965517241379
                  },
                  {
                    "": 146,
                    "date": "2020-01-30T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 27,
                    "perc": 0.931034482758621
                  },
                  {
                    "": 147,
                    "date": "2020-01-31T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 88,
                    "perc": 3.03448275862069
                  },
                  {
                    "": 148,
                    "date": "2020-02-01T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 37,
                    "perc": 1.27586206896552
                  },
                  {
                    "": 149,
                    "date": "2020-02-02T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 121,
                    "perc": 4.17241379310345
                  },
                  {
                    "": 150,
                    "date": "2020-02-03T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 167,
                    "perc": 5.75862068965517
                  },
                  {
                    "": 151,
                    "date": "2020-02-04T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 126,
                    "perc": 4.3448275862069
                  },
                  {
                    "": 152,
                    "date": "2020-02-05T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 87,
                    "perc": 3
                  },
                  {
                    "": 153,
                    "date": "2020-02-06T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 14,
                    "perc": 0.482758620689655
                  },
                  {
                    "": 154,
                    "date": "2020-02-07T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 28,
                    "perc": 0.96551724137931
                  },
                  {
                    "": 155,
                    "date": "2020-02-08T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 36,
                    "perc": 1.24137931034483
                  },
                  {
                    "": 156,
                    "date": "2020-02-09T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 28,
                    "perc": 0.96551724137931
                  },
                  {
                    "": 157,
                    "date": "2020-02-10T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 125,
                    "perc": 4.31034482758621
                  },
                  {
                    "": 158,
                    "date": "2020-02-11T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 106,
                    "perc": 3.6551724137931
                  },
                  {
                    "": 159,
                    "date": "2020-02-12T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 15,
                    "perc": 0.517241379310345
                  },
                  {
                    "": 160,
                    "date": "2020-02-13T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 7,
                    "perc": 0.241379310344828
                  },
                  {
                    "": 161,
                    "date": "2020-02-14T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 211,
                    "perc": 7.27586206896552
                  },
                  {
                    "": 162,
                    "date": "2020-02-15T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 69,
                    "perc": 2.37931034482759
                  },
                  {
                    "": 163,
                    "date": "2020-02-16T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 32,
                    "perc": 1.10344827586207
                  },
                  {
                    "": 164,
                    "date": "2020-02-17T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 26,
                    "perc": 0.896551724137931
                  },
                  {
                    "": 165,
                    "date": "2020-02-18T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 4,
                    "perc": 0.137931034482759
                  },
                  {
                    "": 166,
                    "date": "2020-02-19T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 50,
                    "perc": 1.72413793103448
                  },
                  {
                    "": 167,
                    "date": "2020-02-20T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 56,
                    "perc": 1.93103448275862
                  },
                  {
                    "": 168,
                    "date": "2020-02-21T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 33,
                    "perc": 1.13793103448276
                  },
                  {
                    "": 169,
                    "date": "2020-02-22T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 30,
                    "perc": 1.03448275862069
                  },
                  {
                    "": 170,
                    "date": "2020-02-23T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 47,
                    "perc": 1.62068965517241
                  },
                  {
                    "": 171,
                    "date": "2020-02-24T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 88,
                    "perc": 3.03448275862069
                  },
                  {
                    "": 172,
                    "date": "2020-02-25T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 32,
                    "perc": 1.10344827586207
                  },
                  {
                    "": 173,
                    "date": "2020-02-26T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 130,
                    "perc": 4.48275862068965
                  },
                  {
                    "": 174,
                    "date": "2020-02-27T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 179,
                    "perc": 6.17241379310345
                  },
                  {
                    "": 175,
                    "date": "2020-02-28T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 174,
                    "perc": 6
                  },
                  {
                    "": 176,
                    "date": "2020-02-29T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 30,
                    "perc": 1.03448275862069
                  },
                  {
                    "": 177,
                    "date": "2020-03-01T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 186,
                    "perc": 6.41379310344828
                  },
                  {
                    "": 178,
                    "date": "2020-03-02T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 145,
                    "perc": 5
                  },
                  {
                    "": 179,
                    "date": "2020-03-03T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 154,
                    "perc": 5.31034482758621
                  },
                  {
                    "": 180,
                    "date": "2020-03-04T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 155,
                    "perc": 5.3448275862069
                  },
                  {
                    "": 181,
                    "date": "2020-03-05T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 2,
                    "perc": 0.0689655172413793
                  },
                  {
                    "": 182,
                    "date": "2020-03-06T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 149,
                    "perc": 5.13793103448276
                  },
                  {
                    "": 183,
                    "date": "2020-03-07T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 185,
                    "perc": 6.37931034482759
                  },
                  {
                    "": 184,
                    "date": "2020-03-08T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 209,
                    "perc": 7.20689655172414
                  },
                  {
                    "": 185,
                    "date": "2020-03-09T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 49,
                    "perc": 1.68965517241379
                  },
                  {
                    "": 186,
                    "date": "2020-03-10T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 155,
                    "perc": 5.3448275862069
                  },
                  {
                    "": 187,
                    "date": "2020-03-11T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 52,
                    "perc": 1.79310344827586
                  },
                  {
                    "": 188,
                    "date": "2020-03-12T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 43,
                    "perc": 1.48275862068966
                  },
                  {
                    "": 189,
                    "date": "2020-03-13T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 22,
                    "perc": 0.758620689655172
                  },
                  {
                    "": 190,
                    "date": "2020-03-14T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 26,
                    "perc": 0.896551724137931
                  },
                  {
                    "": 191,
                    "date": "2020-03-15T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 4,
                    "perc": 0.137931034482759
                  },
                  {
                    "": 192,
                    "date": "2020-03-16T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 23,
                    "perc": 0.793103448275862
                  },
                  {
                    "": 193,
                    "date": "2020-03-17T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 34,
                    "perc": 1.17241379310345
                  },
                  {
                    "": 194,
                    "date": "2020-03-18T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 35,
                    "perc": 1.20689655172414
                  },
                  {
                    "": 195,
                    "date": "2020-03-19T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 36,
                    "perc": 1.24137931034483
                  },
                  {
                    "": 196,
                    "date": "2020-03-20T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 24,
                    "perc": 0.827586206896552
                  },
                  {
                    "": 197,
                    "date": "2020-03-21T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 30,
                    "perc": 1.03448275862069
                  },
                  {
                    "": 198,
                    "date": "2020-03-22T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 65,
                    "perc": 2.24137931034483
                  },
                  {
                    "": 199,
                    "date": "2020-03-23T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 11,
                    "perc": 0.379310344827586
                  },
                  {
                    "": 200,
                    "date": "2020-03-24T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 12,
                    "perc": 0.413793103448276
                  },
                  {
                    "": 201,
                    "date": "2020-03-25T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 9,
                    "perc": 0.310344827586207
                  },
                  {
                    "": 202,
                    "date": "2020-03-26T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 19,
                    "perc": 0.655172413793103
                  },
                  {
                    "": 203,
                    "date": "2020-03-27T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 14,
                    "perc": 0.482758620689655
                  },
                  {
                    "": 204,
                    "date": "2020-03-28T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 6,
                    "perc": 0.206896551724138
                  },
                  {
                    "": 205,
                    "date": "2020-03-31T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 1,
                    "perc": 0.0344827586206897
                  },
                  {
                    "": 206,
                    "date": "2020-04-03T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 12,
                    "perc": 0.413793103448276
                  },
                  {
                    "": 207,
                    "date": "2020-04-04T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 1,
                    "perc": 0.0344827586206897
                  },
                  {
                    "": 208,
                    "date": "2020-04-06T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 2,
                    "perc": 0.0689655172413793
                  },
                  {
                    "": 209,
                    "date": "2020-04-07T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 5,
                    "perc": 0.172413793103448
                  },
                  {
                    "": 210,
                    "date": "2020-04-08T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 4,
                    "perc": 0.137931034482759
                  },
                  {
                    "": 211,
                    "date": "2020-04-09T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 2,
                    "perc": 0.0689655172413793
                  },
                  {
                    "": 212,
                    "date": "2020-04-10T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 1,
                    "perc": 0.0344827586206897
                  },
                  {
                    "": 213,
                    "date": "2020-04-12T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 1,
                    "perc": 0.0344827586206897
                  },
                  {
                    "": 214,
                    "date": "2020-04-13T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 4,
                    "perc": 0.137931034482759
                  },
                  {
                    "": 215,
                    "date": "2020-04-14T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 14,
                    "perc": 0.482758620689655
                  },
                  {
                    "": 216,
                    "date": "2020-04-15T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 5,
                    "perc": 0.172413793103448
                  },
                  {
                    "": 217,
                    "date": "2020-04-17T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 4,
                    "perc": 0.137931034482759
                  },
                  {
                    "": 218,
                    "date": "2020-04-18T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 6,
                    "perc": 0.206896551724138
                  },
                  {
                    "": 219,
                    "date": "2020-04-19T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 5,
                    "perc": 0.172413793103448
                  },
                  {
                    "": 220,
                    "date": "2020-04-20T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 3,
                    "perc": 0.103448275862069
                  },
                  {
                    "": 221,
                    "date": "2020-04-21T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 3,
                    "perc": 0.103448275862069
                  },
                  {
                    "": 222,
                    "date": "2020-04-22T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 1,
                    "perc": 0.0344827586206897
                  },
                  {
                    "": 223,
                    "date": "2020-04-25T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 2,
                    "perc": 0.0689655172413793
                  },
                  {
                    "": 224,
                    "date": "2020-04-26T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 9,
                    "perc": 0.310344827586207
                  },
                  {
                    "": 225,
                    "date": "2020-04-27T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 4,
                    "perc": 0.137931034482759
                  },
                  {
                    "": 226,
                    "date": "2020-04-28T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 6,
                    "perc": 0.206896551724138
                  },
                  {
                    "": 227,
                    "date": "2020-04-29T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 21,
                    "perc": 0.724137931034483
                  },
                  {
                    "": 228,
                    "date": "2020-04-30T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 5,
                    "perc": 0.172413793103448
                  },
                  {
                    "": 229,
                    "date": "2020-05-01T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 18,
                    "perc": 0.620689655172414
                  },
                  {
                    "": 230,
                    "date": "2020-05-02T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 21,
                    "perc": 0.724137931034483
                  },
                  {
                    "": 231,
                    "date": "2020-05-03T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 5,
                    "perc": 0.172413793103448
                  },
                  {
                    "": 232,
                    "date": "2020-05-04T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 1,
                    "perc": 0.0344827586206897
                  },
                  {
                    "": 233,
                    "date": "2020-05-05T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 3,
                    "perc": 0.103448275862069
                  },
                  {
                    "": 234,
                    "date": "2020-05-06T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 29,
                    "perc": 1
                  },
                  {
                    "": 235,
                    "date": "2020-05-07T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 1,
                    "perc": 0.0344827586206897
                  },
                  {
                    "": 236,
                    "date": "2020-05-10T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 1,
                    "perc": 0.0344827586206897
                  },
                  {
                    "": 237,
                    "date": "2020-05-11T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 30,
                    "perc": 1.03448275862069
                  },
                  {
                    "": 238,
                    "date": "2020-05-12T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 23,
                    "perc": 0.793103448275862
                  },
                  {
                    "": 239,
                    "date": "2020-05-13T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 5,
                    "perc": 0.172413793103448
                  },
                  {
                    "": 240,
                    "date": "2020-05-14T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 15,
                    "perc": 0.517241379310345
                  },
                  {
                    "": 241,
                    "date": "2020-05-15T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 10,
                    "perc": 0.344827586206897
                  },
                  {
                    "": 242,
                    "date": "2020-05-16T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 1,
                    "perc": 0.0344827586206897
                  },
                  {
                    "": 243,
                    "date": "2020-05-17T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 4,
                    "perc": 0.137931034482759
                  },
                  {
                    "": 244,
                    "date": "2020-05-18T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 1,
                    "perc": 0.0344827586206897
                  },
                  {
                    "": 245,
                    "date": "2020-05-19T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 7,
                    "perc": 0.241379310344828
                  },
                  {
                    "": 246,
                    "date": "2020-05-20T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 12,
                    "perc": 0.413793103448276
                  },
                  {
                    "": 247,
                    "date": "2020-05-21T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 29,
                    "perc": 1
                  },
                  {
                    "": 248,
                    "date": "2020-05-22T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 2,
                    "perc": 0.0689655172413793
                  },
                  {
                    "": 249,
                    "date": "2020-05-23T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 13,
                    "perc": 0.448275862068966
                  },
                  {
                    "": 250,
                    "date": "2020-05-24T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 50,
                    "perc": 1.72413793103448
                  },
                  {
                    "": 251,
                    "date": "2020-05-25T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 4,
                    "perc": 0.137931034482759
                  },
                  {
                    "": 252,
                    "date": "2020-05-26T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 3,
                    "perc": 0.103448275862069
                  },
                  {
                    "": 253,
                    "date": "2020-05-27T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 21,
                    "perc": 0.724137931034483
                  },
                  {
                    "": 254,
                    "date": "2020-05-28T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 4,
                    "perc": 0.137931034482759
                  },
                  {
                    "": 255,
                    "date": "2020-05-29T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 1,
                    "perc": 0.0344827586206897
                  },
                  {
                    "": 256,
                    "date": "2020-05-30T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 25,
                    "perc": 0.862068965517241
                  },
                  {
                    "": 257,
                    "date": "2020-05-31T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 25,
                    "perc": 0.862068965517241
                  },
                  {
                    "": 258,
                    "date": "2020-06-01T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 27,
                    "perc": 0.931034482758621
                  },
                  {
                    "": 259,
                    "date": "2020-06-02T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 43,
                    "perc": 1.48275862068966
                  },
                  {
                    "": 260,
                    "date": "2020-06-03T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 12,
                    "perc": 0.413793103448276
                  },
                  {
                    "": 261,
                    "date": "2020-06-04T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 40,
                    "perc": 1.37931034482759
                  },
                  {
                    "": 262,
                    "date": "2020-06-05T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 51,
                    "perc": 1.75862068965517
                  },
                  {
                    "": 263,
                    "date": "2020-06-06T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 38,
                    "perc": 1.31034482758621
                  },
                  {
                    "": 264,
                    "date": "2020-06-07T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 27,
                    "perc": 0.931034482758621
                  },
                  {
                    "": 265,
                    "date": "2020-06-08T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 17,
                    "perc": 0.586206896551724
                  },
                  {
                    "": 266,
                    "date": "2020-06-09T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 22,
                    "perc": 0.758620689655172
                  },
                  {
                    "": 267,
                    "date": "2020-06-10T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 15,
                    "perc": 0.517241379310345
                  },
                  {
                    "": 268,
                    "date": "2020-06-11T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 50,
                    "perc": 1.72413793103448
                  },
                  {
                    "": 269,
                    "date": "2020-06-12T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 66,
                    "perc": 2.27586206896552
                  },
                  {
                    "": 270,
                    "date": "2020-06-13T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 52,
                    "perc": 1.79310344827586
                  },
                  {
                    "": 271,
                    "date": "2020-06-14T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 63,
                    "perc": 2.17241379310345
                  },
                  {
                    "": 272,
                    "date": "2020-06-15T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 66,
                    "perc": 2.27586206896552
                  },
                  {
                    "": 273,
                    "date": "2020-06-16T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 90,
                    "perc": 3.10344827586207
                  },
                  {
                    "": 274,
                    "date": "2020-06-17T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 79,
                    "perc": 2.72413793103448
                  },
                  {
                    "": 275,
                    "date": "2020-06-18T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 66,
                    "perc": 2.27586206896552
                  },
                  {
                    "": 276,
                    "date": "2020-06-19T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 35,
                    "perc": 1.20689655172414
                  },
                  {
                    "": 277,
                    "date": "2020-06-20T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 52,
                    "perc": 1.79310344827586
                  },
                  {
                    "": 278,
                    "date": "2020-06-21T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 18,
                    "perc": 0.620689655172414
                  },
                  {
                    "": 279,
                    "date": "2020-06-22T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 37,
                    "perc": 1.27586206896552
                  },
                  {
                    "": 280,
                    "date": "2020-06-23T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 18,
                    "perc": 0.620689655172414
                  },
                  {
                    "": 281,
                    "date": "2020-06-24T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 5,
                    "perc": 0.172413793103448
                  },
                  {
                    "": 282,
                    "date": "2020-06-25T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 41,
                    "perc": 1.41379310344828
                  },
                  {
                    "": 283,
                    "date": "2020-06-26T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 54,
                    "perc": 1.86206896551724
                  },
                  {
                    "": 284,
                    "date": "2020-06-27T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 53,
                    "perc": 1.82758620689655
                  },
                  {
                    "": 285,
                    "date": "2020-06-28T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 26,
                    "perc": 0.896551724137931
                  },
                  {
                    "": 286,
                    "date": "2020-06-29T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 32,
                    "perc": 1.10344827586207
                  },
                  {
                    "": 287,
                    "date": "2020-06-30T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 35,
                    "perc": 1.20689655172414
                  },
                  {
                    "": 288,
                    "date": "2020-07-01T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 37,
                    "perc": 1.27586206896552
                  },
                  {
                    "": 289,
                    "date": "2020-07-02T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 57,
                    "perc": 1.96551724137931
                  },
                  {
                    "": 290,
                    "date": "2020-07-03T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 52,
                    "perc": 1.79310344827586
                  },
                  {
                    "": 291,
                    "date": "2020-07-04T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 62,
                    "perc": 2.13793103448276
                  },
                  {
                    "": 292,
                    "date": "2020-07-05T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 8,
                    "perc": 0.275862068965517
                  },
                  {
                    "": 293,
                    "date": "2020-07-06T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 47,
                    "perc": 1.62068965517241
                  },
                  {
                    "": 294,
                    "date": "2020-07-07T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 72,
                    "perc": 2.48275862068966
                  },
                  {
                    "": 295,
                    "date": "2020-07-08T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 94,
                    "perc": 3.24137931034483
                  },
                  {
                    "": 296,
                    "date": "2020-07-09T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 82,
                    "perc": 2.82758620689655
                  },
                  {
                    "": 297,
                    "date": "2020-07-10T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 59,
                    "perc": 2.03448275862069
                  },
                  {
                    "": 298,
                    "date": "2020-07-11T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 93,
                    "perc": 3.20689655172414
                  },
                  {
                    "": 299,
                    "date": "2020-07-12T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 89,
                    "perc": 3.06896551724138
                  },
                  {
                    "": 300,
                    "date": "2020-07-13T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 90,
                    "perc": 3.10344827586207
                  },
                  {
                    "": 301,
                    "date": "2020-07-14T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 76,
                    "perc": 2.62068965517241
                  },
                  {
                    "": 302,
                    "date": "2020-07-15T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 59,
                    "perc": 2.03448275862069
                  },
                  {
                    "": 303,
                    "date": "2020-07-16T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 72,
                    "perc": 2.48275862068966
                  },
                  {
                    "": 304,
                    "date": "2020-07-17T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 85,
                    "perc": 2.93103448275862
                  },
                  {
                    "": 305,
                    "date": "2020-07-18T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 84,
                    "perc": 2.89655172413793
                  },
                  {
                    "": 306,
                    "date": "2020-07-19T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 95,
                    "perc": 3.27586206896552
                  },
                  {
                    "": 307,
                    "date": "2020-07-20T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 100,
                    "perc": 3.44827586206897
                  },
                  {
                    "": 308,
                    "date": "2020-07-21T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 65,
                    "perc": 2.24137931034483
                  },
                  {
                    "": 309,
                    "date": "2020-07-22T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 87,
                    "perc": 3
                  },
                  {
                    "": 310,
                    "date": "2020-07-23T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 78,
                    "perc": 2.68965517241379
                  },
                  {
                    "": 311,
                    "date": "2020-07-24T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 94,
                    "perc": 3.24137931034483
                  },
                  {
                    "": 312,
                    "date": "2020-07-25T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 93,
                    "perc": 3.20689655172414
                  },
                  {
                    "": 313,
                    "date": "2020-07-26T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 94,
                    "perc": 3.24137931034483
                  },
                  {
                    "": 314,
                    "date": "2020-07-27T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 86,
                    "perc": 2.96551724137931
                  },
                  {
                    "": 315,
                    "date": "2020-07-28T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 90,
                    "perc": 3.10344827586207
                  },
                  {
                    "": 316,
                    "date": "2020-07-29T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 73,
                    "perc": 2.51724137931034
                  },
                  {
                    "": 317,
                    "date": "2020-07-30T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 66,
                    "perc": 2.27586206896552
                  },
                  {
                    "": 318,
                    "date": "2020-07-31T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 26,
                    "perc": 0.896551724137931
                  },
                  {
                    "": 319,
                    "date": "2020-01-01T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 39928,
                    "perc": 0.869918142488095
                  },
                  {
                    "": 320,
                    "date": "2020-01-02T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46859,
                    "perc": 1.02092502100906
                  },
                  {
                    "": 321,
                    "date": "2020-01-03T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 48378,
                    "perc": 1.05401973295154
                  },
                  {
                    "": 322,
                    "date": "2020-01-04T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 44395,
                    "perc": 0.967241432973326
                  },
                  {
                    "": 323,
                    "date": "2020-01-05T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46264,
                    "perc": 1.00796165457997
                  },
                  {
                    "": 324,
                    "date": "2020-01-06T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 49043,
                    "perc": 1.06850820131346
                  },
                  {
                    "": 325,
                    "date": "2020-01-07T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46423,
                    "perc": 1.01142581468455
                  },
                  {
                    "": 326,
                    "date": "2020-01-08T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46275,
                    "perc": 1.00820131345513
                  },
                  {
                    "": 327,
                    "date": "2020-01-09T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 48224,
                    "perc": 1.05066450869931
                  },
                  {
                    "": 328,
                    "date": "2020-01-10T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 49416,
                    "perc": 1.07663481589841
                  },
                  {
                    "": 329,
                    "date": "2020-01-11T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 42219,
                    "perc": 0.919832550032681
                  },
                  {
                    "": 330,
                    "date": "2020-01-12T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 43666,
                    "perc": 0.951358585701391
                  },
                  {
                    "": 331,
                    "date": "2020-01-13T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 47139,
                    "perc": 1.02702542874039
                  },
                  {
                    "": 332,
                    "date": "2020-01-14T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 44988,
                    "perc": 0.980161225061471
                  },
                  {
                    "": 333,
                    "date": "2020-01-15T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 45477,
                    "perc": 0.990815151420835
                  },
                  {
                    "": 334,
                    "date": "2020-01-16T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46259,
                    "perc": 1.00785271872763
                  },
                  {
                    "": 335,
                    "date": "2020-01-17T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 48144,
                    "perc": 1.04892153506178
                  },
                  {
                    "": 336,
                    "date": "2020-01-18T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 35793,
                    "perc": 0.779828192598587
                  },
                  {
                    "": 337,
                    "date": "2020-01-19T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 42226,
                    "perc": 0.919985060225964
                  },
                  {
                    "": 338,
                    "date": "2020-01-20T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 45946,
                    "perc": 1.00103333437082
                  },
                  {
                    "": 339,
                    "date": "2020-01-21T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46040,
                    "perc": 1.00308132839491
                  },
                  {
                    "": 340,
                    "date": "2020-01-22T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46051,
                    "perc": 1.00332098727007
                  },
                  {
                    "": 341,
                    "date": "2020-01-23T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 48535,
                    "perc": 1.05744031871518
                  },
                  {
                    "": 342,
                    "date": "2020-01-24T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 48989,
                    "perc": 1.06733169410813
                  },
                  {
                    "": 343,
                    "date": "2020-01-25T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 42565,
                    "perc": 0.927370911014971
                  },
                  {
                    "": 344,
                    "date": "2020-01-26T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 42698,
                    "perc": 0.930268604687354
                  },
                  {
                    "": 345,
                    "date": "2020-01-27T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 47589,
                    "perc": 1.03682965545146
                  },
                  {
                    "": 346,
                    "date": "2020-01-28T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46355,
                    "perc": 1.00994428709266
                  },
                  {
                    "": 347,
                    "date": "2020-01-29T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 44935,
                    "perc": 0.979006505026611
                  },
                  {
                    "": 348,
                    "date": "2020-01-30T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 47107,
                    "perc": 1.02632823928538
                  },
                  {
                    "": 349,
                    "date": "2020-01-31T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 49030,
                    "perc": 1.06822496809736
                  },
                  {
                    "": 350,
                    "date": "2020-02-01T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 43033,
                    "perc": 0.937567306794485
                  },
                  {
                    "": 351,
                    "date": "2020-02-02T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 42947,
                    "perc": 0.935693610134147
                  },
                  {
                    "": 352,
                    "date": "2020-02-03T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 48017,
                    "perc": 1.04615456441221
                  },
                  {
                    "": 353,
                    "date": "2020-02-04T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 47126,
                    "perc": 1.02674219552429
                  },
                  {
                    "": 354,
                    "date": "2020-02-05T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46634,
                    "perc": 1.01602290765352
                  },
                  {
                    "": 355,
                    "date": "2020-02-06T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 47576,
                    "perc": 1.03654642223536
                  },
                  {
                    "": 356,
                    "date": "2020-02-07T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 48906,
                    "perc": 1.0655233589592
                  },
                  {
                    "": 357,
                    "date": "2020-02-08T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 43348,
                    "perc": 0.944430265492234
                  },
                  {
                    "": 358,
                    "date": "2020-02-09T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 42471,
                    "perc": 0.925322916990881
                  },
                  {
                    "": 359,
                    "date": "2020-02-10T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 47557,
                    "perc": 1.03613246599645
                  },
                  {
                    "": 360,
                    "date": "2020-02-11T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46642,
                    "perc": 1.01619720501727
                  },
                  {
                    "": 361,
                    "date": "2020-02-12T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 47016,
                    "perc": 1.0243456067727
                  },
                  {
                    "": 362,
                    "date": "2020-02-13T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 48414,
                    "perc": 1.05480407108842
                  },
                  {
                    "": 363,
                    "date": "2020-02-14T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 50801,
                    "perc": 1.10681004699804
                  },
                  {
                    "": 364,
                    "date": "2020-02-15T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 43960,
                    "perc": 0.957764013819291
                  },
                  {
                    "": 365,
                    "date": "2020-02-16T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 44148,
                    "perc": 0.961860001867472
                  },
                  {
                    "": 366,
                    "date": "2020-02-17T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 47502,
                    "perc": 1.03493417162065
                  },
                  {
                    "": 367,
                    "date": "2020-02-18T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 47475,
                    "perc": 1.03434591801799
                  },
                  {
                    "": 368,
                    "date": "2020-02-19T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 48184,
                    "perc": 1.04979302188054
                  },
                  {
                    "": 369,
                    "date": "2020-02-20T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 49445,
                    "perc": 1.07726664384201
                  },
                  {
                    "": 370,
                    "date": "2020-02-21T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 50668,
                    "perc": 1.10391235332566
                  },
                  {
                    "": 371,
                    "date": "2020-02-22T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 44469,
                    "perc": 0.968853683588036
                  },
                  {
                    "": 372,
                    "date": "2020-02-23T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 45659,
                    "perc": 0.994780416446201
                  },
                  {
                    "": 373,
                    "date": "2020-02-24T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 48683,
                    "perc": 1.0606648199446
                  },
                  {
                    "": 374,
                    "date": "2020-02-25T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46642,
                    "perc": 1.01619720501727
                  },
                  {
                    "": 375,
                    "date": "2020-02-26T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 47683,
                    "perc": 1.03887764947555
                  },
                  {
                    "": 376,
                    "date": "2020-02-27T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 50039,
                    "perc": 1.09020822310063
                  },
                  {
                    "": 377,
                    "date": "2020-02-28T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 51090,
                    "perc": 1.11310653926359
                  },
                  {
                    "": 378,
                    "date": "2020-02-29T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 43933,
                    "perc": 0.957175760216627
                  },
                  {
                    "": 379,
                    "date": "2020-03-01T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 45178,
                    "perc": 0.98430078745059
                  },
                  {
                    "": 380,
                    "date": "2020-03-02T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 48887,
                    "perc": 1.06510940272028
                  },
                  {
                    "": 381,
                    "date": "2020-03-03T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46515,
                    "perc": 1.01343023436771
                  },
                  {
                    "": 382,
                    "date": "2020-03-04T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 47723,
                    "perc": 1.03974913629431
                  },
                  {
                    "": 383,
                    "date": "2020-03-05T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 49161,
                    "perc": 1.0710790874288
                  },
                  {
                    "": 384,
                    "date": "2020-03-06T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 48591,
                    "perc": 1.05866040026145
                  },
                  {
                    "": 385,
                    "date": "2020-03-07T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 43657,
                    "perc": 0.95116250116717
                  },
                  {
                    "": 386,
                    "date": "2020-03-08T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46566,
                    "perc": 1.01454138006163
                  },
                  {
                    "": 387,
                    "date": "2020-03-09T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 48159,
                    "perc": 1.04924834261882
                  },
                  {
                    "": 388,
                    "date": "2020-03-10T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 45254,
                    "perc": 0.985956612406237
                  },
                  {
                    "": 389,
                    "date": "2020-03-11T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46609,
                    "perc": 1.0154782283918
                  },
                  {
                    "": 390,
                    "date": "2020-03-12T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46792,
                    "perc": 1.01946528058763
                  },
                  {
                    "": 391,
                    "date": "2020-03-13T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 45883,
                    "perc": 0.999660742631268
                  },
                  {
                    "": 392,
                    "date": "2020-03-14T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 40123,
                    "perc": 0.874166640729559
                  },
                  {
                    "": 393,
                    "date": "2020-03-15T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 40057,
                    "perc": 0.872728687478602
                  },
                  {
                    "": 394,
                    "date": "2020-03-16T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 39710,
                    "perc": 0.865168539325843
                  },
                  {
                    "": 395,
                    "date": "2020-03-17T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 37714,
                    "perc": 0.821681347069626
                  },
                  {
                    "": 396,
                    "date": "2020-03-18T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 35784,
                    "perc": 0.779632108064366
                  },
                  {
                    "": 397,
                    "date": "2020-03-19T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 34044,
                    "perc": 0.741722431448224
                  },
                  {
                    "": 398,
                    "date": "2020-03-20T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 32489,
                    "perc": 0.707843381368857
                  },
                  {
                    "": 399,
                    "date": "2020-03-21T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 26346,
                    "perc": 0.574004793177503
                  },
                  {
                    "": 400,
                    "date": "2020-03-22T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 24284,
                    "perc": 0.529079647670329
                  },
                  {
                    "": 401,
                    "date": "2020-03-23T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 22068,
                    "perc": 0.480799277910922
                  },
                  {
                    "": 402,
                    "date": "2020-03-24T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 21774,
                    "perc": 0.474393849793022
                  },
                  {
                    "": 403,
                    "date": "2020-03-25T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 18609,
                    "perc": 0.405437455258489
                  },
                  {
                    "": 404,
                    "date": "2020-03-26T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 18605,
                    "perc": 0.405350306576613
                  },
                  {
                    "": 405,
                    "date": "2020-03-27T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 17360,
                    "perc": 0.37822527934265
                  },
                  {
                    "": 406,
                    "date": "2020-03-28T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 15118,
                    "perc": 0.329378443151047
                  },
                  {
                    "": 407,
                    "date": "2020-03-29T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 14467,
                    "perc": 0.315194995175698
                  },
                  {
                    "": 408,
                    "date": "2020-03-30T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 14569,
                    "perc": 0.317417286563541
                  },
                  {
                    "": 409,
                    "date": "2020-03-31T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 14569,
                    "perc": 0.317417286563541
                  },
                  {
                    "": 410,
                    "date": "2020-04-01T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 14520,
                    "perc": 0.316349715210557
                  },
                  {
                    "": 411,
                    "date": "2020-04-02T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 13833,
                    "perc": 0.301381929098322
                  },
                  {
                    "": 412,
                    "date": "2020-04-03T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 13382,
                    "perc": 0.291555915216782
                  },
                  {
                    "": 413,
                    "date": "2020-04-04T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11059,
                    "perc": 0.240944318217187
                  },
                  {
                    "": 414,
                    "date": "2020-04-05T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 10996,
                    "perc": 0.239571726477637
                  },
                  {
                    "": 415,
                    "date": "2020-04-06T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 12187,
                    "perc": 0.265520246506272
                  },
                  {
                    "": 416,
                    "date": "2020-04-07T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 12570,
                    "perc": 0.273864732795916
                  },
                  {
                    "": 417,
                    "date": "2020-04-08T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 12180,
                    "perc": 0.265367736312988
                  },
                  {
                    "": 418,
                    "date": "2020-04-09T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 12007,
                    "perc": 0.261598555821843
                  },
                  {
                    "": 419,
                    "date": "2020-04-10T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11525,
                    "perc": 0.251097139655763
                  },
                  {
                    "": 420,
                    "date": "2020-04-11T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 9933,
                    "perc": 0.21641196426904
                  },
                  {
                    "": 421,
                    "date": "2020-04-12T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 9065,
                    "perc": 0.197500700301908
                  },
                  {
                    "": 422,
                    "date": "2020-04-13T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 9917,
                    "perc": 0.216063369541536
                  },
                  {
                    "": 423,
                    "date": "2020-04-14T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11271,
                    "perc": 0.245563198356625
                  },
                  {
                    "": 424,
                    "date": "2020-04-15T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11296,
                    "perc": 0.246107877618351
                  },
                  {
                    "": 425,
                    "date": "2020-04-16T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11058,
                    "perc": 0.240922531046718
                  },
                  {
                    "": 426,
                    "date": "2020-04-17T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 10904,
                    "perc": 0.237567306794485
                  },
                  {
                    "": 427,
                    "date": "2020-04-18T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 8943,
                    "perc": 0.194842665504684
                  },
                  {
                    "": 428,
                    "date": "2020-04-19T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 8670,
                    "perc": 0.188894767966635
                  },
                  {
                    "": 429,
                    "date": "2020-04-20T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 9525,
                    "perc": 0.207522798717669
                  },
                  {
                    "": 430,
                    "date": "2020-04-21T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 10768,
                    "perc": 0.234604251610694
                  },
                  {
                    "": 431,
                    "date": "2020-04-22T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11046,
                    "perc": 0.240661085001089
                  },
                  {
                    "": 432,
                    "date": "2020-04-23T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11250,
                    "perc": 0.245105667776775
                  },
                  {
                    "": 433,
                    "date": "2020-04-24T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 10910,
                    "perc": 0.237698029817299
                  },
                  {
                    "": 434,
                    "date": "2020-04-25T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 9110,
                    "perc": 0.198481122973015
                  },
                  {
                    "": 435,
                    "date": "2020-04-26T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 8867,
                    "perc": 0.193186840549037
                  },
                  {
                    "": 436,
                    "date": "2020-04-27T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 10030,
                    "perc": 0.218525319804538
                  },
                  {
                    "": 437,
                    "date": "2020-04-28T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11071,
                    "perc": 0.241205764262816
                  },
                  {
                    "": 438,
                    "date": "2020-04-29T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11431,
                    "perc": 0.249049145631672
                  },
                  {
                    "": 439,
                    "date": "2020-04-30T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11542,
                    "perc": 0.251467521553737
                  },
                  {
                    "": 440,
                    "date": "2020-05-01T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11925,
                    "perc": 0.259812007843381
                  },
                  {
                    "": 441,
                    "date": "2020-05-02T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 9805,
                    "perc": 0.213623206449002
                  },
                  {
                    "": 442,
                    "date": "2020-05-03T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 10086,
                    "perc": 0.219745401350805
                  },
                  {
                    "": 443,
                    "date": "2020-05-04T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 10749,
                    "perc": 0.234190295371783
                  },
                  {
                    "": 444,
                    "date": "2020-05-05T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11695,
                    "perc": 0.254800958635501
                  },
                  {
                    "": 445,
                    "date": "2020-05-06T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11444,
                    "perc": 0.24933237884777
                  },
                  {
                    "": 446,
                    "date": "2020-05-07T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 12963,
                    "perc": 0.282427090790252
                  },
                  {
                    "": 447,
                    "date": "2020-05-08T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 12387,
                    "perc": 0.269877680600081
                  },
                  {
                    "": 448,
                    "date": "2020-05-09T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 9927,
                    "perc": 0.216281241246226
                  },
                  {
                    "": 449,
                    "date": "2020-05-10T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 9765,
                    "perc": 0.212751719630241
                  },
                  {
                    "": 450,
                    "date": "2020-05-11T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 10933,
                    "perc": 0.238199134738087
                  },
                  {
                    "": 451,
                    "date": "2020-05-12T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11921,
                    "perc": 0.259724859161505
                  },
                  {
                    "": 452,
                    "date": "2020-05-13T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 12580,
                    "perc": 0.274082604500607
                  },
                  {
                    "": 453,
                    "date": "2020-05-14T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 13103,
                    "perc": 0.285477294655918
                  },
                  {
                    "": 454,
                    "date": "2020-05-15T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 12922,
                    "perc": 0.281533816801021
                  },
                  {
                    "": 455,
                    "date": "2020-05-16T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 10822,
                    "perc": 0.235780758816023
                  },
                  {
                    "": 456,
                    "date": "2020-05-17T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 10333,
                    "perc": 0.225126832456659
                  },
                  {
                    "": 457,
                    "date": "2020-05-18T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11575,
                    "perc": 0.252186498179215
                  },
                  {
                    "": 458,
                    "date": "2020-05-19T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 12358,
                    "perc": 0.269245852656479
                  },
                  {
                    "": 459,
                    "date": "2020-05-20T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 13486,
                    "perc": 0.293821780945563
                  },
                  {
                    "": 460,
                    "date": "2020-05-21T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 13455,
                    "perc": 0.293146378661023
                  },
                  {
                    "": 461,
                    "date": "2020-05-22T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 13868,
                    "perc": 0.302144480064739
                  },
                  {
                    "": 462,
                    "date": "2020-05-23T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11111,
                    "perc": 0.242077251081577
                  },
                  {
                    "": 463,
                    "date": "2020-05-24T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 10614,
                    "perc": 0.231249027358461
                  },
                  {
                    "": 464,
                    "date": "2020-05-25T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11664,
                    "perc": 0.25412555635096
                  },
                  {
                    "": 465,
                    "date": "2020-05-26T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 12530,
                    "perc": 0.272993245977155
                  },
                  {
                    "": 466,
                    "date": "2020-05-27T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 13900,
                    "perc": 0.302841669519749
                  },
                  {
                    "": 467,
                    "date": "2020-05-28T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 14260,
                    "perc": 0.310685050888605
                  },
                  {
                    "": 468,
                    "date": "2020-05-29T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 14225,
                    "perc": 0.309922499922189
                  },
                  {
                    "": 469,
                    "date": "2020-05-30T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11662,
                    "perc": 0.254081982010022
                  },
                  {
                    "": 470,
                    "date": "2020-05-31T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11790,
                    "perc": 0.25687073983006
                  },
                  {
                    "": 471,
                    "date": "2020-06-01T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 13554,
                    "perc": 0.295303308537458
                  },
                  {
                    "": 472,
                    "date": "2020-06-02T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 14391,
                    "perc": 0.31353917022005
                  },
                  {
                    "": 473,
                    "date": "2020-06-03T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 15582,
                    "perc": 0.339487690248685
                  },
                  {
                    "": 474,
                    "date": "2020-06-04T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 15852,
                    "perc": 0.345370226275328
                  },
                  {
                    "": 475,
                    "date": "2020-06-05T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 15813,
                    "perc": 0.344520526627035
                  },
                  {
                    "": 476,
                    "date": "2020-06-06T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 13115,
                    "perc": 0.285738740701547
                  },
                  {
                    "": 477,
                    "date": "2020-06-07T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 13500,
                    "perc": 0.29412680133213
                  },
                  {
                    "": 478,
                    "date": "2020-06-08T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 14901,
                    "perc": 0.324650627159264
                  },
                  {
                    "": 479,
                    "date": "2020-06-09T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 15696,
                    "perc": 0.341971427682156
                  },
                  {
                    "": 480,
                    "date": "2020-06-10T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 16289,
                    "perc": 0.354891219770301
                  },
                  {
                    "": 481,
                    "date": "2020-06-11T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 17054,
                    "perc": 0.371558405179122
                  },
                  {
                    "": 482,
                    "date": "2020-06-12T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 17103,
                    "perc": 0.372625976532105
                  },
                  {
                    "": 483,
                    "date": "2020-06-13T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 14370,
                    "perc": 0.3130816396402
                  },
                  {
                    "": 484,
                    "date": "2020-06-14T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 14943,
                    "perc": 0.325565688318964
                  },
                  {
                    "": 485,
                    "date": "2020-06-15T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 16894,
                    "perc": 0.368072457904074
                  },
                  {
                    "": 486,
                    "date": "2020-06-16T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 17207,
                    "perc": 0.374891842260886
                  },
                  {
                    "": 487,
                    "date": "2020-06-17T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 17750,
                    "perc": 0.386722275825578
                  },
                  {
                    "": 488,
                    "date": "2020-06-18T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 18782,
                    "perc": 0.409206635749634
                  },
                  {
                    "": 489,
                    "date": "2020-06-19T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 18917,
                    "perc": 0.412147903762956
                  },
                  {
                    "": 490,
                    "date": "2020-06-20T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 15927,
                    "perc": 0.347004264060506
                  },
                  {
                    "": 491,
                    "date": "2020-06-21T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 16747,
                    "perc": 0.364869743845124
                  },
                  {
                    "": 492,
                    "date": "2020-06-22T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 18396,
                    "perc": 0.400796787948582
                  },
                  {
                    "": 493,
                    "date": "2020-06-23T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 18666,
                    "perc": 0.406679323975225
                  },
                  {
                    "": 494,
                    "date": "2020-06-24T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 19430,
                    "perc": 0.423324722213577
                  },
                  {
                    "": 495,
                    "date": "2020-06-25T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 20123,
                    "perc": 0.438423231348626
                  },
                  {
                    "": 496,
                    "date": "2020-06-26T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 20558,
                    "perc": 0.447900650502661
                  },
                  {
                    "": 497,
                    "date": "2020-06-27T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 17107,
                    "perc": 0.372713125213981
                  },
                  {
                    "": 498,
                    "date": "2020-06-28T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 17394,
                    "perc": 0.378966043138598
                  },
                  {
                    "": 499,
                    "date": "2020-06-29T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 18877,
                    "perc": 0.411276416944194
                  },
                  {
                    "": 500,
                    "date": "2020-06-30T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 19111,
                    "perc": 0.416374614833951
                  },
                  {
                    "": 501,
                    "date": "2020-07-01T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 21547,
                    "perc": 0.469448162096548
                  },
                  {
                    "": 502,
                    "date": "2020-07-02T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 23029,
                    "perc": 0.501736748731675
                  },
                  {
                    "": 503,
                    "date": "2020-07-03T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 23815,
                    "perc": 0.518861464720346
                  },
                  {
                    "": 504,
                    "date": "2020-07-04T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 18845,
                    "perc": 0.410579227489184
                  },
                  {
                    "": 505,
                    "date": "2020-07-05T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 20655,
                    "perc": 0.450014006038159
                  },
                  {
                    "": 506,
                    "date": "2020-07-06T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 22530,
                    "perc": 0.490864950667621
                  },
                  {
                    "": 507,
                    "date": "2020-07-07T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 23029,
                    "perc": 0.501736748731675
                  },
                  {
                    "": 508,
                    "date": "2020-07-08T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 24041,
                    "perc": 0.523785365246351
                  },
                  {
                    "": 509,
                    "date": "2020-07-09T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 25332,
                    "perc": 0.55191260232189
                  },
                  {
                    "": 510,
                    "date": "2020-07-10T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 25980,
                    "perc": 0.566030688785832
                  },
                  {
                    "": 511,
                    "date": "2020-07-11T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 22995,
                    "perc": 0.500995984935728
                  },
                  {
                    "": 512,
                    "date": "2020-07-12T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 23332,
                    "perc": 0.508338261383797
                  },
                  {
                    "": 513,
                    "date": "2020-07-13T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 24122,
                    "perc": 0.525550126054343
                  },
                  {
                    "": 514,
                    "date": "2020-07-14T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 24029,
                    "perc": 0.523523919200722
                  },
                  {
                    "": 515,
                    "date": "2020-07-15T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 25281,
                    "perc": 0.550801456627969
                  },
                  {
                    "": 516,
                    "date": "2020-07-16T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 26397,
                    "perc": 0.575115938871425
                  },
                  {
                    "": 517,
                    "date": "2020-07-17T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 27256,
                    "perc": 0.593831118304336
                  },
                  {
                    "": 518,
                    "date": "2020-07-18T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 24518,
                    "perc": 0.534177845560086
                  },
                  {
                    "": 519,
                    "date": "2020-07-19T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 23251,
                    "perc": 0.506573500575804
                  },
                  {
                    "": 520,
                    "date": "2020-07-20T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 24575,
                    "perc": 0.535419714276822
                  },
                  {
                    "": 521,
                    "date": "2020-07-21T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 24492,
                    "perc": 0.533611379127891
                  },
                  {
                    "": 522,
                    "date": "2020-07-22T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 24413,
                    "perc": 0.531890192660836
                  },
                  {
                    "": 523,
                    "date": "2020-07-23T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 25187,
                    "perc": 0.548753462603878
                  },
                  {
                    "": 524,
                    "date": "2020-07-24T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 27024,
                    "perc": 0.588776494755517
                  },
                  {
                    "": 525,
                    "date": "2020-07-25T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 24519,
                    "perc": 0.534199632730555
                  },
                  {
                    "": 526,
                    "date": "2020-07-26T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 24530,
                    "perc": 0.534439291605714
                  },
                  {
                    "": 527,
                    "date": "2020-07-27T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 24743,
                    "perc": 0.539079958915621
                  },
                  {
                    "": 528,
                    "date": "2020-07-28T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 24469,
                    "perc": 0.533110274207103
                  },
                  {
                    "": 529,
                    "date": "2020-07-29T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 24987,
                    "perc": 0.544396028510069
                  },
                  {
                    "": 530,
                    "date": "2020-07-30T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 20637,
                    "perc": 0.449621836969716
                  },
                  {
                    "": 531,
                    "date": "2020-07-31T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 26787,
                    "perc": 0.583612935354353
                  },
                  {
                    "": 532,
                    "date": "2020-01-01T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7556,
                    "perc": 0.868719717500205
                  },
                  {
                    "": 533,
                    "date": "2020-01-02T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9216,
                    "perc": 1.05957132298596
                  },
                  {
                    "": 534,
                    "date": "2020-01-03T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9016,
                    "perc": 1.03657715365032
                  },
                  {
                    "": 535,
                    "date": "2020-01-04T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8291,
                    "perc": 0.953223289808656
                  },
                  {
                    "": 536,
                    "date": "2020-01-05T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8792,
                    "perc": 1.01082368399442
                  },
                  {
                    "": 537,
                    "date": "2020-01-06T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8885,
                    "perc": 1.02151597273549
                  },
                  {
                    "": 538,
                    "date": "2020-01-07T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9129,
                    "perc": 1.04956885932496
                  },
                  {
                    "": 539,
                    "date": "2020-01-08T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9157,
                    "perc": 1.05278804303195
                  },
                  {
                    "": 540,
                    "date": "2020-01-09T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9573,
                    "perc": 1.10061591525006
                  },
                  {
                    "": 541,
                    "date": "2020-01-10T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9300,
                    "perc": 1.06922887410692
                  },
                  {
                    "": 542,
                    "date": "2020-01-11T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7599,
                    "perc": 0.873663463907366
                  },
                  {
                    "": 543,
                    "date": "2020-01-12T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7845,
                    "perc": 0.901946292190195
                  },
                  {
                    "": 544,
                    "date": "2020-01-13T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8722,
                    "perc": 1.00277572472694
                  },
                  {
                    "": 545,
                    "date": "2020-01-14T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9042,
                    "perc": 1.03956639566396
                  },
                  {
                    "": 546,
                    "date": "2020-01-15T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10646,
                    "perc": 1.22397963373573
                  },
                  {
                    "": 547,
                    "date": "2020-01-16T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10332,
                    "perc": 1.18787878787879
                  },
                  {
                    "": 548,
                    "date": "2020-01-17T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10641,
                    "perc": 1.22340477950234
                  },
                  {
                    "": 549,
                    "date": "2020-01-18T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7116,
                    "perc": 0.818132544961813
                  },
                  {
                    "": 550,
                    "date": "2020-01-19T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8567,
                    "perc": 0.984955243491829
                  },
                  {
                    "": 551,
                    "date": "2020-01-20T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10109,
                    "perc": 1.16224028906956
                  },
                  {
                    "": 552,
                    "date": "2020-01-21T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10915,
                    "perc": 1.25490679149216
                  },
                  {
                    "": 553,
                    "date": "2020-01-22T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10264,
                    "perc": 1.18006077030467
                  },
                  {
                    "": 554,
                    "date": "2020-01-23T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10943,
                    "perc": 1.25812597519915
                  },
                  {
                    "": 555,
                    "date": "2020-01-24T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10780,
                    "perc": 1.23938572719061
                  },
                  {
                    "": 556,
                    "date": "2020-01-25T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7880,
                    "perc": 0.90597027182393
                  },
                  {
                    "": 557,
                    "date": "2020-01-26T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8677,
                    "perc": 0.997602036626427
                  },
                  {
                    "": 558,
                    "date": "2020-01-27T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9576,
                    "perc": 1.1009608277901
                  },
                  {
                    "": 559,
                    "date": "2020-01-28T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9871,
                    "perc": 1.13487722756015
                  },
                  {
                    "": 560,
                    "date": "2020-01-29T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10741,
                    "perc": 1.23490186417016
                  },
                  {
                    "": 561,
                    "date": "2020-01-30T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10870,
                    "perc": 1.24973310339164
                  },
                  {
                    "": 562,
                    "date": "2020-01-31T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10589,
                    "perc": 1.21742629547508
                  },
                  {
                    "": 563,
                    "date": "2020-02-01T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8033,
                    "perc": 0.923560811365689
                  },
                  {
                    "": 564,
                    "date": "2020-02-02T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8449,
                    "perc": 0.971388683583805
                  },
                  {
                    "": 565,
                    "date": "2020-02-03T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10243,
                    "perc": 1.17764638252443
                  },
                  {
                    "": 566,
                    "date": "2020-02-04T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9742,
                    "perc": 1.12004598833867
                  },
                  {
                    "": 567,
                    "date": "2020-02-05T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10364,
                    "perc": 1.19155785497249
                  },
                  {
                    "": 568,
                    "date": "2020-02-06T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9903,
                    "perc": 1.13855629465386
                  },
                  {
                    "": 569,
                    "date": "2020-02-07T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10405,
                    "perc": 1.19627165968629
                  },
                  {
                    "": 570,
                    "date": "2020-02-08T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9743,
                    "perc": 1.12016095918535
                  },
                  {
                    "": 571,
                    "date": "2020-02-09T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8123,
                    "perc": 0.933908187566724
                  },
                  {
                    "": 572,
                    "date": "2020-02-10T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8516,
                    "perc": 0.979091730311243
                  },
                  {
                    "": 573,
                    "date": "2020-02-11T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9415,
                    "perc": 1.08245052147491
                  },
                  {
                    "": 574,
                    "date": "2020-02-12T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 11630,
                    "perc": 1.33711094686704
                  },
                  {
                    "": 575,
                    "date": "2020-02-13T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10779,
                    "perc": 1.23927075634393
                  },
                  {
                    "": 576,
                    "date": "2020-02-14T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 12537,
                    "perc": 1.44138950480414
                  },
                  {
                    "": 577,
                    "date": "2020-02-15T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10156,
                    "perc": 1.16764391886343
                  },
                  {
                    "": 578,
                    "date": "2020-02-16T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9318,
                    "perc": 1.07129834934713
                  },
                  {
                    "": 579,
                    "date": "2020-02-17T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 11404,
                    "perc": 1.31112753551778
                  },
                  {
                    "": 580,
                    "date": "2020-02-18T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10735,
                    "perc": 1.23421203909009
                  },
                  {
                    "": 581,
                    "date": "2020-02-19T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 11547,
                    "perc": 1.32756836659276
                  },
                  {
                    "": 582,
                    "date": "2020-02-20T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 11882,
                    "perc": 1.36608360022994
                  },
                  {
                    "": 583,
                    "date": "2020-02-21T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 12579,
                    "perc": 1.44621828036462
                  },
                  {
                    "": 584,
                    "date": "2020-02-22T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10935,
                    "perc": 1.25720620842572
                  },
                  {
                    "": 585,
                    "date": "2020-02-23T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10301,
                    "perc": 1.18431469163176
                  },
                  {
                    "": 586,
                    "date": "2020-02-24T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 11230,
                    "perc": 1.29112260819578
                  },
                  {
                    "": 587,
                    "date": "2020-02-25T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10094,
                    "perc": 1.16051572636938
                  },
                  {
                    "": 588,
                    "date": "2020-02-26T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10084,
                    "perc": 1.1593660179026
                  },
                  {
                    "": 589,
                    "date": "2020-02-27T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 11233,
                    "perc": 1.29146752073581
                  },
                  {
                    "": 590,
                    "date": "2020-02-28T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 12252,
                    "perc": 1.40862281350086
                  },
                  {
                    "": 591,
                    "date": "2020-02-29T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10355,
                    "perc": 1.19052311735239
                  },
                  {
                    "": 592,
                    "date": "2020-03-01T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9881,
                    "perc": 1.13602693602694
                  },
                  {
                    "": 593,
                    "date": "2020-03-02T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10122,
                    "perc": 1.16373491007637
                  },
                  {
                    "": 594,
                    "date": "2020-03-03T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10741,
                    "perc": 1.23490186417016
                  },
                  {
                    "": 595,
                    "date": "2020-03-04T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 11433,
                    "perc": 1.31446169007145
                  },
                  {
                    "": 596,
                    "date": "2020-03-05T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 11939,
                    "perc": 1.3726369384906
                  },
                  {
                    "": 597,
                    "date": "2020-03-06T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 11810,
                    "perc": 1.35780569926911
                  },
                  {
                    "": 598,
                    "date": "2020-03-07T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9228,
                    "perc": 1.0609509731461
                  },
                  {
                    "": 599,
                    "date": "2020-03-08T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10612,
                    "perc": 1.22007062494867
                  },
                  {
                    "": 600,
                    "date": "2020-03-09T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 11167,
                    "perc": 1.28387944485505
                  },
                  {
                    "": 601,
                    "date": "2020-03-10T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10335,
                    "perc": 1.18822370041882
                  },
                  {
                    "": 602,
                    "date": "2020-03-11T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10948,
                    "perc": 1.25870082943254
                  },
                  {
                    "": 603,
                    "date": "2020-03-12T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 11150,
                    "perc": 1.28192494046153
                  },
                  {
                    "": 604,
                    "date": "2020-03-13T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10675,
                    "perc": 1.2273137882894
                  },
                  {
                    "": 605,
                    "date": "2020-03-14T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8535,
                    "perc": 0.981276176398128
                  },
                  {
                    "": 606,
                    "date": "2020-03-15T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9073,
                    "perc": 1.04313049191098
                  },
                  {
                    "": 607,
                    "date": "2020-03-16T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9331,
                    "perc": 1.07279297035395
                  },
                  {
                    "": 608,
                    "date": "2020-03-17T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9046,
                    "perc": 1.04002627905067
                  },
                  {
                    "": 609,
                    "date": "2020-03-18T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8784,
                    "perc": 1.00990391722099
                  },
                  {
                    "": 610,
                    "date": "2020-03-19T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7517,
                    "perc": 0.864235854479757
                  },
                  {
                    "": 611,
                    "date": "2020-03-20T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7334,
                    "perc": 0.843196189537653
                  },
                  {
                    "": 612,
                    "date": "2020-03-21T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6882,
                    "perc": 0.791229366839123
                  },
                  {
                    "": 613,
                    "date": "2020-03-22T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5525,
                    "perc": 0.635213927896855
                  },
                  {
                    "": 614,
                    "date": "2020-03-23T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4834,
                    "perc": 0.555769072842244
                  },
                  {
                    "": 615,
                    "date": "2020-03-24T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5172,
                    "perc": 0.594629219019463
                  },
                  {
                    "": 616,
                    "date": "2020-03-25T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5354,
                    "perc": 0.615553913114889
                  },
                  {
                    "": 617,
                    "date": "2020-03-26T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5866,
                    "perc": 0.674418986614109
                  },
                  {
                    "": 618,
                    "date": "2020-03-27T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5298,
                    "perc": 0.609115545700912
                  },
                  {
                    "": 619,
                    "date": "2020-03-28T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 3803,
                    "perc": 0.437234129917057
                  },
                  {
                    "": 620,
                    "date": "2020-03-29T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 3221,
                    "perc": 0.370321097150365
                  },
                  {
                    "": 621,
                    "date": "2020-03-30T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4046,
                    "perc": 0.465172045659851
                  },
                  {
                    "": 622,
                    "date": "2020-03-31T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4441,
                    "perc": 0.510585530097725
                  },
                  {
                    "": 623,
                    "date": "2020-04-01T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4777,
                    "perc": 0.549215734581588
                  },
                  {
                    "": 624,
                    "date": "2020-04-02T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4195,
                    "perc": 0.482302701814897
                  },
                  {
                    "": 625,
                    "date": "2020-04-03T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4280,
                    "perc": 0.492075223782541
                  },
                  {
                    "": 626,
                    "date": "2020-04-04T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 3471,
                    "perc": 0.399063808819906
                  },
                  {
                    "": 627,
                    "date": "2020-04-05T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 3008,
                    "perc": 0.345832306807917
                  },
                  {
                    "": 628,
                    "date": "2020-04-06T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 3667,
                    "perc": 0.421598094768826
                  },
                  {
                    "": 629,
                    "date": "2020-04-07T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4192,
                    "perc": 0.481957789274862
                  },
                  {
                    "": 630,
                    "date": "2020-04-08T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4209,
                    "perc": 0.483912293668391
                  },
                  {
                    "": 631,
                    "date": "2020-04-09T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 3805,
                    "perc": 0.437464071610413
                  },
                  {
                    "": 632,
                    "date": "2020-04-10T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 3402,
                    "perc": 0.391130820399113
                  },
                  {
                    "": 633,
                    "date": "2020-04-11T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 3572,
                    "perc": 0.410675864334401
                  },
                  {
                    "": 634,
                    "date": "2020-04-12T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 2326,
                    "perc": 0.267422189373409
                  },
                  {
                    "": 635,
                    "date": "2020-04-13T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 2705,
                    "perc": 0.310996140264433
                  },
                  {
                    "": 636,
                    "date": "2020-04-14T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4385,
                    "perc": 0.504147162683748
                  },
                  {
                    "": 637,
                    "date": "2020-04-15T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4720,
                    "perc": 0.542662396320933
                  },
                  {
                    "": 638,
                    "date": "2020-04-16T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4527,
                    "perc": 0.520473022912047
                  },
                  {
                    "": 639,
                    "date": "2020-04-17T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4160,
                    "perc": 0.478278722181161
                  },
                  {
                    "": 640,
                    "date": "2020-04-18T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 3168,
                    "perc": 0.364227642276423
                  },
                  {
                    "": 641,
                    "date": "2020-04-19T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 3234,
                    "perc": 0.371815718157182
                  },
                  {
                    "": 642,
                    "date": "2020-04-20T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 3956,
                    "perc": 0.454824669458816
                  },
                  {
                    "": 643,
                    "date": "2020-04-21T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4647,
                    "perc": 0.534269524513427
                  },
                  {
                    "": 644,
                    "date": "2020-04-22T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4927,
                    "perc": 0.566461361583313
                  },
                  {
                    "": 645,
                    "date": "2020-04-23T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4752,
                    "perc": 0.546341463414634
                  },
                  {
                    "": 646,
                    "date": "2020-04-24T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4539,
                    "perc": 0.521852673072185
                  },
                  {
                    "": 647,
                    "date": "2020-04-25T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4481,
                    "perc": 0.515184363964852
                  },
                  {
                    "": 648,
                    "date": "2020-04-26T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 3470,
                    "perc": 0.398948837973228
                  },
                  {
                    "": 649,
                    "date": "2020-04-27T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4577,
                    "perc": 0.526221565245955
                  },
                  {
                    "": 650,
                    "date": "2020-04-28T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5291,
                    "perc": 0.608310749774164
                  },
                  {
                    "": 651,
                    "date": "2020-04-29T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4864,
                    "perc": 0.559218198242588
                  },
                  {
                    "": 652,
                    "date": "2020-04-30T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4773,
                    "perc": 0.548755851194876
                  },
                  {
                    "": 653,
                    "date": "2020-05-01T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5177,
                    "perc": 0.595204073252854
                  },
                  {
                    "": 654,
                    "date": "2020-05-02T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4693,
                    "perc": 0.539558183460622
                  },
                  {
                    "": 655,
                    "date": "2020-05-03T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4238,
                    "perc": 0.487246448222058
                  },
                  {
                    "": 656,
                    "date": "2020-05-04T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4730,
                    "perc": 0.543812104787715
                  },
                  {
                    "": 657,
                    "date": "2020-05-05T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5659,
                    "perc": 0.650620021351729
                  },
                  {
                    "": 658,
                    "date": "2020-05-06T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5735,
                    "perc": 0.659357805699269
                  },
                  {
                    "": 659,
                    "date": "2020-05-07T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6443,
                    "perc": 0.740757165147409
                  },
                  {
                    "": 660,
                    "date": "2020-05-08T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5815,
                    "perc": 0.668555473433522
                  },
                  {
                    "": 661,
                    "date": "2020-05-09T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4814,
                    "perc": 0.55346965590868
                  },
                  {
                    "": 662,
                    "date": "2020-05-10T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 3971,
                    "perc": 0.456549232158988
                  },
                  {
                    "": 663,
                    "date": "2020-05-11T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5064,
                    "perc": 0.582212367578221
                  },
                  {
                    "": 664,
                    "date": "2020-05-12T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5825,
                    "perc": 0.669705181900304
                  },
                  {
                    "": 665,
                    "date": "2020-05-13T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6622,
                    "perc": 0.7613369467028
                  },
                  {
                    "": 666,
                    "date": "2020-05-14T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6555,
                    "perc": 0.753633899975363
                  },
                  {
                    "": 667,
                    "date": "2020-05-15T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6605,
                    "perc": 0.759382442309272
                  },
                  {
                    "": 668,
                    "date": "2020-05-16T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5829,
                    "perc": 0.670165065287016
                  },
                  {
                    "": 669,
                    "date": "2020-05-17T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5054,
                    "perc": 0.58106265911144
                  },
                  {
                    "": 670,
                    "date": "2020-05-18T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5311,
                    "perc": 0.610610166707728
                  },
                  {
                    "": 671,
                    "date": "2020-05-19T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6046,
                    "perc": 0.695113739016178
                  },
                  {
                    "": 672,
                    "date": "2020-05-20T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7215,
                    "perc": 0.829514658782951
                  },
                  {
                    "": 673,
                    "date": "2020-05-21T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7563,
                    "perc": 0.869524513426952
                  },
                  {
                    "": 674,
                    "date": "2020-05-22T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6955,
                    "perc": 0.799622238646629
                  },
                  {
                    "": 675,
                    "date": "2020-05-23T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5287,
                    "perc": 0.607850866387452
                  },
                  {
                    "": 676,
                    "date": "2020-05-24T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4626,
                    "perc": 0.531855136733186
                  },
                  {
                    "": 677,
                    "date": "2020-05-25T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5492,
                    "perc": 0.631419889956475
                  },
                  {
                    "": 678,
                    "date": "2020-05-26T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6688,
                    "perc": 0.768925022583559
                  },
                  {
                    "": 679,
                    "date": "2020-05-27T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7448,
                    "perc": 0.856302866058964
                  },
                  {
                    "": 680,
                    "date": "2020-05-28T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6994,
                    "perc": 0.804106101667077
                  },
                  {
                    "": 681,
                    "date": "2020-05-29T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7227,
                    "perc": 0.830894308943089
                  },
                  {
                    "": 682,
                    "date": "2020-05-30T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6257,
                    "perc": 0.719372587665271
                  },
                  {
                    "": 683,
                    "date": "2020-05-31T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6111,
                    "perc": 0.702586844050259
                  },
                  {
                    "": 684,
                    "date": "2020-06-01T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7445,
                    "perc": 0.855957953518929
                  },
                  {
                    "": 685,
                    "date": "2020-06-02T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7974,
                    "perc": 0.916777531411678
                  },
                  {
                    "": 686,
                    "date": "2020-06-03T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7781,
                    "perc": 0.894588158002792
                  },
                  {
                    "": 687,
                    "date": "2020-06-04T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7880,
                    "perc": 0.90597027182393
                  },
                  {
                    "": 688,
                    "date": "2020-06-05T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7616,
                    "perc": 0.875617968300895
                  },
                  {
                    "": 689,
                    "date": "2020-06-06T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5752,
                    "perc": 0.661312310092798
                  },
                  {
                    "": 690,
                    "date": "2020-06-07T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5789,
                    "perc": 0.66556623141989
                  },
                  {
                    "": 691,
                    "date": "2020-06-08T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7137,
                    "perc": 0.820546932742055
                  },
                  {
                    "": 692,
                    "date": "2020-06-09T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7707,
                    "perc": 0.886080315348608
                  },
                  {
                    "": 693,
                    "date": "2020-06-10T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8012,
                    "perc": 0.921146423585448
                  },
                  {
                    "": 694,
                    "date": "2020-06-11T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8398,
                    "perc": 0.965525170403219
                  },
                  {
                    "": 695,
                    "date": "2020-06-12T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8875,
                    "perc": 1.0203662642687
                  },
                  {
                    "": 696,
                    "date": "2020-06-13T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7146,
                    "perc": 0.821581670362158
                  },
                  {
                    "": 697,
                    "date": "2020-06-14T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6319,
                    "perc": 0.726500780159317
                  },
                  {
                    "": 698,
                    "date": "2020-06-15T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8301,
                    "perc": 0.954372998275437
                  },
                  {
                    "": 699,
                    "date": "2020-06-16T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8654,
                    "perc": 0.994957707152829
                  },
                  {
                    "": 700,
                    "date": "2020-06-17T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8892,
                    "perc": 1.02232076866223
                  },
                  {
                    "": 701,
                    "date": "2020-06-18T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8907,
                    "perc": 1.0240453313624
                  },
                  {
                    "": 702,
                    "date": "2020-06-19T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9265,
                    "perc": 1.06520489447319
                  },
                  {
                    "": 703,
                    "date": "2020-06-20T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7723,
                    "perc": 0.887919848895459
                  },
                  {
                    "": 704,
                    "date": "2020-06-21T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6551,
                    "perc": 0.753174016588651
                  },
                  {
                    "": 705,
                    "date": "2020-06-22T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8400,
                    "perc": 0.965755112096575
                  },
                  {
                    "": 706,
                    "date": "2020-06-23T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9006,
                    "perc": 1.03542744518354
                  },
                  {
                    "": 707,
                    "date": "2020-06-24T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9634,
                    "perc": 1.10762913689743
                  },
                  {
                    "": 708,
                    "date": "2020-06-25T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10145,
                    "perc": 1.16637923954997
                  },
                  {
                    "": 709,
                    "date": "2020-06-26T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10034,
                    "perc": 1.15361747556869
                  },
                  {
                    "": 710,
                    "date": "2020-06-27T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7535,
                    "perc": 0.866305329719964
                  },
                  {
                    "": 711,
                    "date": "2020-06-28T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6569,
                    "perc": 0.755243491828858
                  },
                  {
                    "": 712,
                    "date": "2020-06-29T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7888,
                    "perc": 0.906890038597356
                  },
                  {
                    "": 713,
                    "date": "2020-06-30T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8891,
                    "perc": 1.02220579781555
                  },
                  {
                    "": 714,
                    "date": "2020-07-01T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9275,
                    "perc": 1.06635460293997
                  },
                  {
                    "": 715,
                    "date": "2020-07-02T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9888,
                    "perc": 1.13683173195368
                  },
                  {
                    "": 716,
                    "date": "2020-07-03T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9191,
                    "perc": 1.056697051819
                  },
                  {
                    "": 717,
                    "date": "2020-07-04T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6459,
                    "perc": 0.74259669869426
                  },
                  {
                    "": 718,
                    "date": "2020-07-05T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7727,
                    "perc": 0.888379732282171
                  },
                  {
                    "": 719,
                    "date": "2020-07-06T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8628,
                    "perc": 0.991968465139197
                  },
                  {
                    "": 720,
                    "date": "2020-07-07T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8775,
                    "perc": 1.00886917960089
                  },
                  {
                    "": 721,
                    "date": "2020-07-08T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9164,
                    "perc": 1.05359283895869
                  },
                  {
                    "": 722,
                    "date": "2020-07-09T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9774,
                    "perc": 1.12372505543237
                  },
                  {
                    "": 723,
                    "date": "2020-07-10T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9376,
                    "perc": 1.07796665845446
                  },
                  {
                    "": 724,
                    "date": "2020-07-11T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8335,
                    "perc": 0.958282007062495
                  },
                  {
                    "": 725,
                    "date": "2020-07-12T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8416,
                    "perc": 0.967594645643426
                  },
                  {
                    "": 726,
                    "date": "2020-07-13T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9202,
                    "perc": 1.05796173113246
                  },
                  {
                    "": 727,
                    "date": "2020-07-14T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9746,
                    "perc": 1.12050587172538
                  },
                  {
                    "": 728,
                    "date": "2020-07-15T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9833,
                    "perc": 1.13050833538638
                  },
                  {
                    "": 729,
                    "date": "2020-07-16T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9906,
                    "perc": 1.13890120719389
                  },
                  {
                    "": 730,
                    "date": "2020-07-17T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10456,
                    "perc": 1.20213517286688
                  },
                  {
                    "": 731,
                    "date": "2020-07-18T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9160,
                    "perc": 1.05313295557198
                  },
                  {
                    "": 732,
                    "date": "2020-07-19T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8164,
                    "perc": 0.938621992280529
                  },
                  {
                    "": 733,
                    "date": "2020-07-20T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9750,
                    "perc": 1.1209657551121
                  },
                  {
                    "": 734,
                    "date": "2020-07-21T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9944,
                    "perc": 1.14327009936766
                  },
                  {
                    "": 735,
                    "date": "2020-07-22T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10085,
                    "perc": 1.15948098874928
                  },
                  {
                    "": 736,
                    "date": "2020-07-23T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9577,
                    "perc": 1.10107579863677
                  },
                  {
                    "": 737,
                    "date": "2020-07-24T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10443,
                    "perc": 1.20064055186006
                  },
                  {
                    "": 738,
                    "date": "2020-07-25T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9710,
                    "perc": 1.11636692124497
                  },
                  {
                    "": 739,
                    "date": "2020-07-26T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8833,
                    "perc": 1.01553748870822
                  },
                  {
                    "": 740,
                    "date": "2020-07-27T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9054,
                    "perc": 1.04094604582409
                  },
                  {
                    "": 741,
                    "date": "2020-07-28T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9533,
                    "perc": 1.09601708138294
                  },
                  {
                    "": 742,
                    "date": "2020-07-29T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10370,
                    "perc": 1.19224768005256
                  },
                  {
                    "": 743,
                    "date": "2020-07-30T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8726,
                    "perc": 1.00323560811366
                  },
                  {
                    "": 744,
                    "date": "2020-07-31T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10730,
                    "perc": 1.2336371848567
                  },
                  {
                    "": 745,
                    "date": "2020-01-01T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 10928,
                    "perc": 0.783545704101282
                  },
                  {
                    "": 746,
                    "date": "2020-01-02T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13816,
                    "perc": 0.990617445814725
                  },
                  {
                    "": 747,
                    "date": "2020-01-03T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13547,
                    "perc": 0.971329946326873
                  },
                  {
                    "": 748,
                    "date": "2020-01-04T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14232,
                    "perc": 1.02044495431638
                  },
                  {
                    "": 749,
                    "date": "2020-01-05T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15022,
                    "perc": 1.0770885401729
                  },
                  {
                    "": 750,
                    "date": "2020-01-06T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14888,
                    "perc": 1.06748064079977
                  },
                  {
                    "": 751,
                    "date": "2020-01-07T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15195,
                    "perc": 1.08949276846806
                  },
                  {
                    "": 752,
                    "date": "2020-01-08T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14953,
                    "perc": 1.07214118900315
                  },
                  {
                    "": 753,
                    "date": "2020-01-09T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15076,
                    "perc": 1.08096038021879
                  },
                  {
                    "": 754,
                    "date": "2020-01-10T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14251,
                    "perc": 1.0218072684066
                  },
                  {
                    "": 755,
                    "date": "2020-01-11T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 11861,
                    "perc": 0.850442496005244
                  },
                  {
                    "": 756,
                    "date": "2020-01-12T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 12821,
                    "perc": 0.919275207932151
                  },
                  {
                    "": 757,
                    "date": "2020-01-13T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 12676,
                    "perc": 0.908878600401524
                  },
                  {
                    "": 758,
                    "date": "2020-01-14T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13256,
                    "perc": 0.95046503052403
                  },
                  {
                    "": 759,
                    "date": "2020-01-15T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15659,
                    "perc": 1.12276191256607
                  },
                  {
                    "": 760,
                    "date": "2020-01-16T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14735,
                    "perc": 1.05651042733642
                  },
                  {
                    "": 761,
                    "date": "2020-01-17T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15837,
                    "perc": 1.13552464456918
                  },
                  {
                    "": 762,
                    "date": "2020-01-18T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 11334,
                    "perc": 0.812656205187037
                  },
                  {
                    "": 763,
                    "date": "2020-01-19T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13303,
                    "perc": 0.953834965378785
                  },
                  {
                    "": 764,
                    "date": "2020-01-20T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 17179,
                    "perc": 1.23174703978367
                  },
                  {
                    "": 765,
                    "date": "2020-01-21T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15884,
                    "perc": 1.13889457942394
                  },
                  {
                    "": 766,
                    "date": "2020-01-22T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14571,
                    "perc": 1.04475150571557
                  },
                  {
                    "": 767,
                    "date": "2020-01-23T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15788,
                    "perc": 1.13201130823125
                  },
                  {
                    "": 768,
                    "date": "2020-01-24T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16881,
                    "perc": 1.21038021878969
                  },
                  {
                    "": 769,
                    "date": "2020-01-25T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13569,
                    "perc": 0.972907362641865
                  },
                  {
                    "": 770,
                    "date": "2020-01-26T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13442,
                    "perc": 0.963801368459868
                  },
                  {
                    "": 771,
                    "date": "2020-01-27T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13393,
                    "perc": 0.960288032121932
                  },
                  {
                    "": 772,
                    "date": "2020-01-28T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14061,
                    "perc": 1.0081841275044
                  },
                  {
                    "": 773,
                    "date": "2020-01-29T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15435,
                    "perc": 1.10670094644979
                  },
                  {
                    "": 774,
                    "date": "2020-01-30T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15373,
                    "perc": 1.10225550047118
                  },
                  {
                    "": 775,
                    "date": "2020-01-31T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15332,
                    "perc": 1.09931577006596
                  },
                  {
                    "": 776,
                    "date": "2020-02-01T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14329,
                    "perc": 1.02739992625067
                  },
                  {
                    "": 777,
                    "date": "2020-02-02T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14879,
                    "perc": 1.06683533412546
                  },
                  {
                    "": 778,
                    "date": "2020-02-03T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14975,
                    "perc": 1.07371860531815
                  },
                  {
                    "": 779,
                    "date": "2020-02-04T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13777,
                    "perc": 0.987821116892695
                  },
                  {
                    "": 780,
                    "date": "2020-02-05T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14389,
                    "perc": 1.0317019707461
                  },
                  {
                    "": 781,
                    "date": "2020-02-06T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14431,
                    "perc": 1.0347134018929
                  },
                  {
                    "": 782,
                    "date": "2020-02-07T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16343,
                    "perc": 1.17180521981399
                  },
                  {
                    "": 783,
                    "date": "2020-02-08T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 18389,
                    "perc": 1.31850493710821
                  },
                  {
                    "": 784,
                    "date": "2020-02-09T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 12803,
                    "perc": 0.917984594583521
                  },
                  {
                    "": 785,
                    "date": "2020-02-10T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 12343,
                    "perc": 0.885002253451879
                  },
                  {
                    "": 786,
                    "date": "2020-02-11T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 12692,
                    "perc": 0.910025812266973
                  },
                  {
                    "": 787,
                    "date": "2020-02-12T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15811,
                    "perc": 1.13366042528783
                  },
                  {
                    "": 788,
                    "date": "2020-02-13T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15279,
                    "perc": 1.09551563076167
                  },
                  {
                    "": 789,
                    "date": "2020-02-14T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 18667,
                    "perc": 1.33843774327037
                  },
                  {
                    "": 790,
                    "date": "2020-02-15T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 18917,
                    "perc": 1.35636292866801
                  },
                  {
                    "": 791,
                    "date": "2020-02-16T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16776,
                    "perc": 1.20285164092269
                  },
                  {
                    "": 792,
                    "date": "2020-02-17T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 17251,
                    "perc": 1.23690949317819
                  },
                  {
                    "": 793,
                    "date": "2020-02-18T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15914,
                    "perc": 1.14104560167165
                  },
                  {
                    "": 794,
                    "date": "2020-02-19T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 18285,
                    "perc": 1.31104805998279
                  },
                  {
                    "": 795,
                    "date": "2020-02-20T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 17694,
                    "perc": 1.26867292170279
                  },
                  {
                    "": 796,
                    "date": "2020-02-21T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 20620,
                    "perc": 1.47846929159667
                  },
                  {
                    "": 797,
                    "date": "2020-02-22T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 19490,
                    "perc": 1.39744745359938
                  },
                  {
                    "": 798,
                    "date": "2020-02-23T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16969,
                    "perc": 1.21668988404966
                  },
                  {
                    "": 799,
                    "date": "2020-02-24T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15501,
                    "perc": 1.11143319539476
                  },
                  {
                    "": 800,
                    "date": "2020-02-25T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14998,
                    "perc": 1.07536772237473
                  },
                  {
                    "": 801,
                    "date": "2020-02-26T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14331,
                    "perc": 1.02754332773385
                  },
                  {
                    "": 802,
                    "date": "2020-02-27T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 17024,
                    "perc": 1.22063342483714
                  },
                  {
                    "": 803,
                    "date": "2020-02-28T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 18314,
                    "perc": 1.31312738148892
                  },
                  {
                    "": 804,
                    "date": "2020-02-29T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 18397,
                    "perc": 1.31907854304093
                  },
                  {
                    "": 805,
                    "date": "2020-03-01T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15326,
                    "perc": 1.09888556561642
                  },
                  {
                    "": 806,
                    "date": "2020-03-02T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13477,
                    "perc": 0.966310894415537
                  },
                  {
                    "": 807,
                    "date": "2020-03-03T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14882,
                    "perc": 1.06705043635023
                  },
                  {
                    "": 808,
                    "date": "2020-03-04T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16456,
                    "perc": 1.17990740361372
                  },
                  {
                    "": 809,
                    "date": "2020-03-05T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 18679,
                    "perc": 1.33929815216946
                  },
                  {
                    "": 810,
                    "date": "2020-03-06T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 17706,
                    "perc": 1.26953333060188
                  },
                  {
                    "": 811,
                    "date": "2020-03-07T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16533,
                    "perc": 1.18542836071619
                  },
                  {
                    "": 812,
                    "date": "2020-03-08T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16654,
                    "perc": 1.19410415044864
                  },
                  {
                    "": 813,
                    "date": "2020-03-09T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15381,
                    "perc": 1.1028291064039
                  },
                  {
                    "": 814,
                    "date": "2020-03-10T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15393,
                    "perc": 1.10368951530299
                  },
                  {
                    "": 815,
                    "date": "2020-03-11T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15462,
                    "perc": 1.10863686647273
                  },
                  {
                    "": 816,
                    "date": "2020-03-12T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16007,
                    "perc": 1.14771377063957
                  },
                  {
                    "": 817,
                    "date": "2020-03-13T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14482,
                    "perc": 1.03837013971402
                  },
                  {
                    "": 818,
                    "date": "2020-03-14T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14948,
                    "perc": 1.0717826852952
                  },
                  {
                    "": 819,
                    "date": "2020-03-15T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14146,
                    "perc": 1.0142786905396
                  },
                  {
                    "": 820,
                    "date": "2020-03-16T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14470,
                    "perc": 1.03750973081493
                  },
                  {
                    "": 821,
                    "date": "2020-03-17T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13786,
                    "perc": 0.988466423567009
                  },
                  {
                    "": 822,
                    "date": "2020-03-18T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13248,
                    "perc": 0.949891424591306
                  },
                  {
                    "": 823,
                    "date": "2020-03-19T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 10938,
                    "perc": 0.784262711517188
                  },
                  {
                    "": 824,
                    "date": "2020-03-20T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 11558,
                    "perc": 0.828717171303315
                  },
                  {
                    "": 825,
                    "date": "2020-03-21T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13209,
                    "perc": 0.947095095669275
                  },
                  {
                    "": 826,
                    "date": "2020-03-22T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 10753,
                    "perc": 0.77099807432294
                  },
                  {
                    "": 827,
                    "date": "2020-03-23T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 7719,
                    "perc": 0.55345802433728
                  },
                  {
                    "": 828,
                    "date": "2020-03-24T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9379,
                    "perc": 0.672481255377556
                  },
                  {
                    "": 829,
                    "date": "2020-03-25T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9863,
                    "perc": 0.707184414307371
                  },
                  {
                    "": 830,
                    "date": "2020-03-26T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 10378,
                    "perc": 0.744110296226492
                  },
                  {
                    "": 831,
                    "date": "2020-03-27T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9339,
                    "perc": 0.669613225713935
                  },
                  {
                    "": 832,
                    "date": "2020-03-28T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 7653,
                    "perc": 0.548725775392305
                  },
                  {
                    "": 833,
                    "date": "2020-03-29T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 7072,
                    "perc": 0.507067644528209
                  },
                  {
                    "": 834,
                    "date": "2020-03-30T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 7745,
                    "perc": 0.555322243618634
                  },
                  {
                    "": 835,
                    "date": "2020-03-31T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 8491,
                    "perc": 0.608810996845167
                  },
                  {
                    "": 836,
                    "date": "2020-04-01T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9507,
                    "perc": 0.681658950301143
                  },
                  {
                    "": 837,
                    "date": "2020-04-02T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 8380,
                    "perc": 0.600852214528619
                  },
                  {
                    "": 838,
                    "date": "2020-04-03T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 7960,
                    "perc": 0.570737903060597
                  },
                  {
                    "": 839,
                    "date": "2020-04-04T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 7878,
                    "perc": 0.564858442250174
                  },
                  {
                    "": 840,
                    "date": "2020-04-05T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 6807,
                    "perc": 0.488066948006719
                  },
                  {
                    "": 841,
                    "date": "2020-04-06T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 6907,
                    "perc": 0.495237022165772
                  },
                  {
                    "": 842,
                    "date": "2020-04-07T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 7852,
                    "perc": 0.56299422296882
                  },
                  {
                    "": 843,
                    "date": "2020-04-08T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 8330,
                    "perc": 0.597267177449092
                  },
                  {
                    "": 844,
                    "date": "2020-04-09T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 7000,
                    "perc": 0.501905191133691
                  },
                  {
                    "": 845,
                    "date": "2020-04-10T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 8250,
                    "perc": 0.59153111812185
                  },
                  {
                    "": 846,
                    "date": "2020-04-11T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 8651,
                    "perc": 0.620283115499652
                  },
                  {
                    "": 847,
                    "date": "2020-04-12T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 4796,
                    "perc": 0.343876756668169
                  },
                  {
                    "": 848,
                    "date": "2020-04-13T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 5581,
                    "perc": 0.400161838816733
                  },
                  {
                    "": 849,
                    "date": "2020-04-14T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9052,
                    "perc": 0.649035112877453
                  },
                  {
                    "": 850,
                    "date": "2020-04-15T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9628,
                    "perc": 0.690334740033597
                  },
                  {
                    "": 851,
                    "date": "2020-04-16T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9428,
                    "perc": 0.675994591715491
                  },
                  {
                    "": 852,
                    "date": "2020-04-17T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 8420,
                    "perc": 0.60372024419224
                  },
                  {
                    "": 853,
                    "date": "2020-04-18T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 7331,
                    "perc": 0.525638136600156
                  },
                  {
                    "": 854,
                    "date": "2020-04-19T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 7827,
                    "perc": 0.561201704429057
                  },
                  {
                    "": 855,
                    "date": "2020-04-20T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 7900,
                    "perc": 0.566435858565166
                  },
                  {
                    "": 856,
                    "date": "2020-04-21T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9036,
                    "perc": 0.647887901012005
                  },
                  {
                    "": 857,
                    "date": "2020-04-22T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9532,
                    "perc": 0.683451468840906
                  },
                  {
                    "": 858,
                    "date": "2020-04-23T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 8917,
                    "perc": 0.639355512762732
                  },
                  {
                    "": 859,
                    "date": "2020-04-24T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 8733,
                    "perc": 0.626162576310075
                  },
                  {
                    "": 860,
                    "date": "2020-04-25T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 10332,
                    "perc": 0.740812062113328
                  },
                  {
                    "": 861,
                    "date": "2020-04-26T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9219,
                    "perc": 0.661009136723071
                  },
                  {
                    "": 862,
                    "date": "2020-04-27T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 8982,
                    "perc": 0.644016060966116
                  },
                  {
                    "": 863,
                    "date": "2020-04-28T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 10210,
                    "perc": 0.732064571639284
                  },
                  {
                    "": 864,
                    "date": "2020-04-29T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 8369,
                    "perc": 0.600063506371123
                  },
                  {
                    "": 865,
                    "date": "2020-04-30T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9142,
                    "perc": 0.655488179620601
                  },
                  {
                    "": 866,
                    "date": "2020-05-01T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 11450,
                    "perc": 0.820973491211538
                  },
                  {
                    "": 867,
                    "date": "2020-05-02T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 11750,
                    "perc": 0.842483713688696
                  },
                  {
                    "": 868,
                    "date": "2020-05-03T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 10096,
                    "perc": 0.723890687097964
                  },
                  {
                    "": 869,
                    "date": "2020-05-04T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9934,
                    "perc": 0.712275166960298
                  },
                  {
                    "": 870,
                    "date": "2020-05-05T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 10363,
                    "perc": 0.743034785102634
                  },
                  {
                    "": 871,
                    "date": "2020-05-06T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 11300,
                    "perc": 0.810218379972959
                  },
                  {
                    "": 872,
                    "date": "2020-05-07T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 12734,
                    "perc": 0.913037243413775
                  },
                  {
                    "": 873,
                    "date": "2020-05-08T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 11025,
                    "perc": 0.790500676035564
                  },
                  {
                    "": 874,
                    "date": "2020-05-09T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 11978,
                    "perc": 0.858831482771336
                  },
                  {
                    "": 875,
                    "date": "2020-05-10T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 8066,
                    "perc": 0.578338181669193
                  },
                  {
                    "": 876,
                    "date": "2020-05-11T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9612,
                    "perc": 0.689187528168148
                  },
                  {
                    "": 877,
                    "date": "2020-05-12T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 10456,
                    "perc": 0.749702954070554
                  },
                  {
                    "": 878,
                    "date": "2020-05-13T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 12063,
                    "perc": 0.864926045806531
                  },
                  {
                    "": 879,
                    "date": "2020-05-14T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 11507,
                    "perc": 0.825060433482198
                  },
                  {
                    "": 880,
                    "date": "2020-05-15T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 12350,
                    "perc": 0.885504158643012
                  },
                  {
                    "": 881,
                    "date": "2020-05-16T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13354,
                    "perc": 0.957491703199902
                  },
                  {
                    "": 882,
                    "date": "2020-05-17T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 10890,
                    "perc": 0.780821075920842
                  },
                  {
                    "": 883,
                    "date": "2020-05-18T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9408,
                    "perc": 0.674560576883681
                  },
                  {
                    "": 884,
                    "date": "2020-05-19T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 10909,
                    "perc": 0.782183390011062
                  },
                  {
                    "": 885,
                    "date": "2020-05-20T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13097,
                    "perc": 0.939064612611136
                  },
                  {
                    "": 886,
                    "date": "2020-05-21T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15152,
                    "perc": 1.08640963657967
                  },
                  {
                    "": 887,
                    "date": "2020-05-22T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13726,
                    "perc": 0.984164379071578
                  },
                  {
                    "": 888,
                    "date": "2020-05-23T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 12234,
                    "perc": 0.877186872618511
                  },
                  {
                    "": 889,
                    "date": "2020-05-24T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 10121,
                    "perc": 0.725683205637727
                  },
                  {
                    "": 890,
                    "date": "2020-05-25T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9700,
                    "perc": 0.695497193428115
                  },
                  {
                    "": 891,
                    "date": "2020-05-26T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 11560,
                    "perc": 0.828860572786496
                  },
                  {
                    "": 892,
                    "date": "2020-05-27T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13075,
                    "perc": 0.937487196296145
                  },
                  {
                    "": 893,
                    "date": "2020-05-28T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 11775,
                    "perc": 0.844276232228459
                  },
                  {
                    "": 894,
                    "date": "2020-05-29T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13696,
                    "perc": 0.982013356823862
                  },
                  {
                    "": 895,
                    "date": "2020-05-30T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15368,
                    "perc": 1.10189699676322
                  },
                  {
                    "": 896,
                    "date": "2020-05-31T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14631,
                    "perc": 1.049053550211
                  },
                  {
                    "": 897,
                    "date": "2020-06-01T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14417,
                    "perc": 1.03370959151063
                  },
                  {
                    "": 898,
                    "date": "2020-06-02T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14549,
                    "perc": 1.04317408940058
                  },
                  {
                    "": 899,
                    "date": "2020-06-03T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14192,
                    "perc": 1.01757692465276
                  },
                  {
                    "": 900,
                    "date": "2020-06-04T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14521,
                    "perc": 1.04116646863605
                  },
                  {
                    "": 901,
                    "date": "2020-06-05T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13697,
                    "perc": 0.982085057565453
                  },
                  {
                    "": 902,
                    "date": "2020-06-06T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 12630,
                    "perc": 0.90558036628836
                  },
                  {
                    "": 903,
                    "date": "2020-06-07T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13172,
                    "perc": 0.944442168230426
                  },
                  {
                    "": 904,
                    "date": "2020-06-08T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13816,
                    "perc": 0.990617445814725
                  },
                  {
                    "": 905,
                    "date": "2020-06-09T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13170,
                    "perc": 0.944298766747245
                  },
                  {
                    "": 906,
                    "date": "2020-06-10T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13449,
                    "perc": 0.964303273651002
                  },
                  {
                    "": 907,
                    "date": "2020-06-11T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16096,
                    "perc": 1.15409513664113
                  },
                  {
                    "": 908,
                    "date": "2020-06-12T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 19315,
                    "perc": 1.38489982382103
                  },
                  {
                    "": 909,
                    "date": "2020-06-13T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 17152,
                    "perc": 1.22981111976072
                  },
                  {
                    "": 910,
                    "date": "2020-06-14T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15361,
                    "perc": 1.10139509157209
                  },
                  {
                    "": 911,
                    "date": "2020-06-15T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14668,
                    "perc": 1.05170647764985
                  },
                  {
                    "": 912,
                    "date": "2020-06-16T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15247,
                    "perc": 1.09322120703077
                  },
                  {
                    "": 913,
                    "date": "2020-06-17T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16230,
                    "perc": 1.16370303601426
                  },
                  {
                    "": 914,
                    "date": "2020-06-18T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16273,
                    "perc": 1.16678616790265
                  },
                  {
                    "": 915,
                    "date": "2020-06-19T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16597,
                    "perc": 1.19001720817798
                  },
                  {
                    "": 916,
                    "date": "2020-06-20T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15325,
                    "perc": 1.09881386487483
                  },
                  {
                    "": 917,
                    "date": "2020-06-21T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13979,
                    "perc": 1.00230466669398
                  },
                  {
                    "": 918,
                    "date": "2020-06-22T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14547,
                    "perc": 1.0430306879174
                  },
                  {
                    "": 919,
                    "date": "2020-06-23T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14782,
                    "perc": 1.05988036219117
                  },
                  {
                    "": 920,
                    "date": "2020-06-24T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 17457,
                    "perc": 1.25167984594584
                  },
                  {
                    "": 921,
                    "date": "2020-06-25T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 18061,
                    "perc": 1.29498709386651
                  },
                  {
                    "": 922,
                    "date": "2020-06-26T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 18214,
                    "perc": 1.30595730732986
                  },
                  {
                    "": 923,
                    "date": "2020-06-27T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15231,
                    "perc": 1.09207399516532
                  },
                  {
                    "": 924,
                    "date": "2020-06-28T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 12841,
                    "perc": 0.920709222763961
                  },
                  {
                    "": 925,
                    "date": "2020-06-29T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13053,
                    "perc": 0.935909779981153
                  },
                  {
                    "": 926,
                    "date": "2020-06-30T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14976,
                    "perc": 1.07379030605974
                  },
                  {
                    "": 927,
                    "date": "2020-07-01T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15558,
                    "perc": 1.11552013766542
                  },
                  {
                    "": 928,
                    "date": "2020-07-02T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 18006,
                    "perc": 1.29104355307903
                  },
                  {
                    "": 929,
                    "date": "2020-07-03T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 18368,
                    "perc": 1.31699922153481
                  },
                  {
                    "": 930,
                    "date": "2020-07-04T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13748,
                    "perc": 0.985741795386569
                  },
                  {
                    "": 931,
                    "date": "2020-07-05T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14661,
                    "perc": 1.05120457245872
                  },
                  {
                    "": 932,
                    "date": "2020-07-06T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14777,
                    "perc": 1.05952185848322
                  },
                  {
                    "": 933,
                    "date": "2020-07-07T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15010,
                    "perc": 1.07622813127381
                  },
                  {
                    "": 934,
                    "date": "2020-07-08T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15481,
                    "perc": 1.10999918056295
                  },
                  {
                    "": 935,
                    "date": "2020-07-09T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16575,
                    "perc": 1.18843979186299
                  },
                  {
                    "": 936,
                    "date": "2020-07-10T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16419,
                    "perc": 1.17725447617487
                  },
                  {
                    "": 937,
                    "date": "2020-07-11T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 17213,
                    "perc": 1.23418486499775
                  },
                  {
                    "": 938,
                    "date": "2020-07-12T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 17439,
                    "perc": 1.25038923259721
                  },
                  {
                    "": 939,
                    "date": "2020-07-13T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16949,
                    "perc": 1.21525586921785
                  },
                  {
                    "": 940,
                    "date": "2020-07-14T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 17667,
                    "perc": 1.26673700167985
                  },
                  {
                    "": 941,
                    "date": "2020-07-15T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 17397,
                    "perc": 1.2473778014504
                  },
                  {
                    "": 942,
                    "date": "2020-07-16T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 17924,
                    "perc": 1.28516409226861
                  },
                  {
                    "": 943,
                    "date": "2020-07-17T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 19198,
                    "perc": 1.37651083705494
                  },
                  {
                    "": 944,
                    "date": "2020-07-18T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 19283,
                    "perc": 1.38260540009014
                  },
                  {
                    "": 945,
                    "date": "2020-07-19T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16960,
                    "perc": 1.21604457737534
                  },
                  {
                    "": 946,
                    "date": "2020-07-20T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16838,
                    "perc": 1.2072970869013
                  },
                  {
                    "": 947,
                    "date": "2020-07-21T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16766,
                    "perc": 1.20213463350678
                  },
                  {
                    "": 948,
                    "date": "2020-07-22T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15858,
                    "perc": 1.13703036014258
                  },
                  {
                    "": 949,
                    "date": "2020-07-23T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16582,
                    "perc": 1.18894169705412
                  },
                  {
                    "": 950,
                    "date": "2020-07-24T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 18718,
                    "perc": 1.34209448109149
                  },
                  {
                    "": 951,
                    "date": "2020-07-25T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 19089,
                    "perc": 1.36869545622158
                  },
                  {
                    "": 952,
                    "date": "2020-07-26T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 17037,
                    "perc": 1.22156553447781
                  },
                  {
                    "": 953,
                    "date": "2020-07-27T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15564,
                    "perc": 1.11595034211497
                  },
                  {
                    "": 954,
                    "date": "2020-07-28T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16605,
                    "perc": 1.19059081411071
                  },
                  {
                    "": 955,
                    "date": "2020-07-29T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 18466,
                    "perc": 1.32402589421068
                  },
                  {
                    "": 956,
                    "date": "2020-07-30T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15074,
                    "perc": 1.08081697873561
                  },
                  {
                    "": 957,
                    "date": "2020-07-31T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 19681,
                    "perc": 1.41114229524317
                  }
                ]
              },
              "selection": {
                "Select": {
                  "type": "single",
                  "fields": [
                    "destination_type"
                  ],
                  "init": {
                    "destination_type": "large_airport"
                  },
                  "bind": {
                    "destination_type": {
                      "input": "select",
                      "options": [
                        "balloonport",
                        "heliport",
                        "large_airport",
                        "medium_airport",
                        "small_airport"
                      ]
                    }
                  }
                }
              },
              "encoding": {
                "x": {
                  "field": "date",
                  "type": "temporal"
                },
                "y": {
                  "field": "count",
                  "type": "quantitative"
                },
                "color": {
                  "field": "destination_type",
                  "type": "nominal"
                },
                "tooltip": [
                  {
                    "field": "count",
                    "type": "nominal"
                  },
                  {
                    "field": "perc",
                    "type": "nominal"
                  },
                  {
                    "field": "destination_type",
                    "type": "nominal"
                  }
                ],
                "opacity": {
                  "condition": {
                    "test": {
                      "selection": "Select"
                    },
                    "value": 0.75
                  },
                  "value": 0
                }
              },
              "height": 50,
              "width": width
            },
            {
              "mark": {
                "type": "line"
              },
              "data": {
                "values": [
                  {
                    "": 1,
                    "date": "2020-01-01T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 4,
                    "perc": 2
                  },
                  {
                    "": 2,
                    "date": "2020-01-02T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 3,
                    "date": "2020-01-03T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 4,
                    "date": "2020-01-04T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 5,
                    "date": "2020-01-05T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 6,
                    "date": "2020-01-07T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 7,
                    "date": "2020-01-08T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 8,
                    "date": "2020-01-09T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 9,
                    "date": "2020-01-11T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 10,
                    "date": "2020-01-12T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 11,
                    "date": "2020-01-13T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 12,
                    "date": "2020-01-14T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 13,
                    "date": "2020-01-15T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 4,
                    "perc": 2
                  },
                  {
                    "": 14,
                    "date": "2020-01-16T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 15,
                    "date": "2020-01-17T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 16,
                    "date": "2020-01-18T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 17,
                    "date": "2020-01-23T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 18,
                    "date": "2020-01-24T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 19,
                    "date": "2020-01-26T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 20,
                    "date": "2020-01-27T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 21,
                    "date": "2020-01-29T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 22,
                    "date": "2020-01-31T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 23,
                    "date": "2020-02-02T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 24,
                    "date": "2020-02-03T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 25,
                    "date": "2020-02-04T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 26,
                    "date": "2020-02-05T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 27,
                    "date": "2020-02-06T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 28,
                    "date": "2020-02-07T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 29,
                    "date": "2020-02-08T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 30,
                    "date": "2020-02-10T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 31,
                    "date": "2020-02-11T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 32,
                    "date": "2020-02-12T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 4,
                    "perc": 2
                  },
                  {
                    "": 33,
                    "date": "2020-02-13T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 34,
                    "date": "2020-02-15T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 4,
                    "perc": 2
                  },
                  {
                    "": 35,
                    "date": "2020-02-16T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 36,
                    "date": "2020-02-17T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 37,
                    "date": "2020-02-18T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 38,
                    "date": "2020-02-19T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 39,
                    "date": "2020-02-20T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 4,
                    "perc": 2
                  },
                  {
                    "": 40,
                    "date": "2020-02-21T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 41,
                    "date": "2020-02-23T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 42,
                    "date": "2020-02-24T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 43,
                    "date": "2020-02-25T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 44,
                    "date": "2020-02-26T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 4,
                    "perc": 2
                  },
                  {
                    "": 45,
                    "date": "2020-02-27T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 46,
                    "date": "2020-02-28T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 4,
                    "perc": 2
                  },
                  {
                    "": 47,
                    "date": "2020-02-29T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 48,
                    "date": "2020-03-01T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 49,
                    "date": "2020-03-02T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 50,
                    "date": "2020-03-04T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 51,
                    "date": "2020-03-06T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 52,
                    "date": "2020-03-07T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 53,
                    "date": "2020-03-08T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 54,
                    "date": "2020-03-09T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 55,
                    "date": "2020-03-12T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 56,
                    "date": "2020-03-15T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 57,
                    "date": "2020-03-17T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 58,
                    "date": "2020-03-19T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 59,
                    "date": "2020-03-20T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 60,
                    "date": "2020-03-21T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 61,
                    "date": "2020-03-24T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 62,
                    "date": "2020-03-25T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 63,
                    "date": "2020-03-26T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 64,
                    "date": "2020-03-29T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 65,
                    "date": "2020-03-30T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 66,
                    "date": "2020-03-31T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 67,
                    "date": "2020-04-11T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 68,
                    "date": "2020-04-12T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 69,
                    "date": "2020-04-16T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 70,
                    "date": "2020-04-22T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 71,
                    "date": "2020-04-23T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 72,
                    "date": "2020-04-24T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 73,
                    "date": "2020-04-25T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 74,
                    "date": "2020-04-26T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 75,
                    "date": "2020-04-27T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 76,
                    "date": "2020-04-29T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 77,
                    "date": "2020-05-02T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 78,
                    "date": "2020-05-06T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 79,
                    "date": "2020-05-10T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 80,
                    "date": "2020-05-13T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 81,
                    "date": "2020-05-17T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 82,
                    "date": "2020-05-22T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 83,
                    "date": "2020-05-24T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 84,
                    "date": "2020-05-30T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 85,
                    "date": "2020-05-31T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 86,
                    "date": "2020-06-01T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 87,
                    "date": "2020-06-02T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 88,
                    "date": "2020-06-03T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 89,
                    "date": "2020-06-05T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 90,
                    "date": "2020-06-07T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 91,
                    "date": "2020-06-09T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 92,
                    "date": "2020-06-10T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 93,
                    "date": "2020-06-13T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 94,
                    "date": "2020-06-14T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 95,
                    "date": "2020-06-15T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 96,
                    "date": "2020-06-16T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 97,
                    "date": "2020-06-17T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 98,
                    "date": "2020-06-20T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 99,
                    "date": "2020-06-21T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 100,
                    "date": "2020-06-22T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 101,
                    "date": "2020-06-23T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 102,
                    "date": "2020-06-24T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 103,
                    "date": "2020-06-25T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 104,
                    "date": "2020-06-26T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 105,
                    "date": "2020-06-27T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 106,
                    "date": "2020-06-28T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 2,
                    "perc": 1
                  },
                  {
                    "": 107,
                    "date": "2020-06-29T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 108,
                    "date": "2020-07-09T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 109,
                    "date": "2020-07-11T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 110,
                    "date": "2020-07-16T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 111,
                    "date": "2020-07-17T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 112,
                    "date": "2020-07-18T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 113,
                    "date": "2020-07-19T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 3,
                    "perc": 1.5
                  },
                  {
                    "": 114,
                    "date": "2020-07-21T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 5,
                    "perc": 2.5
                  },
                  {
                    "": 115,
                    "date": "2020-07-22T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 4,
                    "perc": 2
                  },
                  {
                    "": 116,
                    "date": "2020-07-24T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 4,
                    "perc": 2
                  },
                  {
                    "": 117,
                    "date": "2020-07-25T00:00:00.000Z",
                    "destination_type": "balloonport",
                    "count": 1,
                    "perc": 0.5
                  },
                  {
                    "": 118,
                    "date": "2020-01-01T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 44,
                    "perc": 1.51724137931034
                  },
                  {
                    "": 119,
                    "date": "2020-01-02T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 55,
                    "perc": 1.89655172413793
                  },
                  {
                    "": 120,
                    "date": "2020-01-03T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 12,
                    "perc": 0.413793103448276
                  },
                  {
                    "": 121,
                    "date": "2020-01-04T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 41,
                    "perc": 1.41379310344828
                  },
                  {
                    "": 122,
                    "date": "2020-01-05T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 20,
                    "perc": 0.689655172413793
                  },
                  {
                    "": 123,
                    "date": "2020-01-06T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 10,
                    "perc": 0.344827586206897
                  },
                  {
                    "": 124,
                    "date": "2020-01-07T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 21,
                    "perc": 0.724137931034483
                  },
                  {
                    "": 125,
                    "date": "2020-01-08T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 39,
                    "perc": 1.3448275862069
                  },
                  {
                    "": 126,
                    "date": "2020-01-09T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 67,
                    "perc": 2.31034482758621
                  },
                  {
                    "": 127,
                    "date": "2020-01-10T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 58,
                    "perc": 2
                  },
                  {
                    "": 128,
                    "date": "2020-01-11T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 18,
                    "perc": 0.620689655172414
                  },
                  {
                    "": 129,
                    "date": "2020-01-12T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 31,
                    "perc": 1.06896551724138
                  },
                  {
                    "": 130,
                    "date": "2020-01-13T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 53,
                    "perc": 1.82758620689655
                  },
                  {
                    "": 131,
                    "date": "2020-01-14T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 52,
                    "perc": 1.79310344827586
                  },
                  {
                    "": 132,
                    "date": "2020-01-15T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 33,
                    "perc": 1.13793103448276
                  },
                  {
                    "": 133,
                    "date": "2020-01-16T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 21,
                    "perc": 0.724137931034483
                  },
                  {
                    "": 134,
                    "date": "2020-01-17T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 3,
                    "perc": 0.103448275862069
                  },
                  {
                    "": 135,
                    "date": "2020-01-18T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 1,
                    "perc": 0.0344827586206897
                  },
                  {
                    "": 136,
                    "date": "2020-01-19T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 1,
                    "perc": 0.0344827586206897
                  },
                  {
                    "": 137,
                    "date": "2020-01-20T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 18,
                    "perc": 0.620689655172414
                  },
                  {
                    "": 138,
                    "date": "2020-01-21T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 29,
                    "perc": 1
                  },
                  {
                    "": 139,
                    "date": "2020-01-22T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 9,
                    "perc": 0.310344827586207
                  },
                  {
                    "": 140,
                    "date": "2020-01-24T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 1,
                    "perc": 0.0344827586206897
                  },
                  {
                    "": 141,
                    "date": "2020-01-25T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 131,
                    "perc": 4.51724137931035
                  },
                  {
                    "": 142,
                    "date": "2020-01-26T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 34,
                    "perc": 1.17241379310345
                  },
                  {
                    "": 143,
                    "date": "2020-01-27T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 129,
                    "perc": 4.44827586206897
                  },
                  {
                    "": 144,
                    "date": "2020-01-28T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 21,
                    "perc": 0.724137931034483
                  },
                  {
                    "": 145,
                    "date": "2020-01-29T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 78,
                    "perc": 2.68965517241379
                  },
                  {
                    "": 146,
                    "date": "2020-01-30T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 27,
                    "perc": 0.931034482758621
                  },
                  {
                    "": 147,
                    "date": "2020-01-31T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 88,
                    "perc": 3.03448275862069
                  },
                  {
                    "": 148,
                    "date": "2020-02-01T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 37,
                    "perc": 1.27586206896552
                  },
                  {
                    "": 149,
                    "date": "2020-02-02T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 121,
                    "perc": 4.17241379310345
                  },
                  {
                    "": 150,
                    "date": "2020-02-03T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 167,
                    "perc": 5.75862068965517
                  },
                  {
                    "": 151,
                    "date": "2020-02-04T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 126,
                    "perc": 4.3448275862069
                  },
                  {
                    "": 152,
                    "date": "2020-02-05T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 87,
                    "perc": 3
                  },
                  {
                    "": 153,
                    "date": "2020-02-06T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 14,
                    "perc": 0.482758620689655
                  },
                  {
                    "": 154,
                    "date": "2020-02-07T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 28,
                    "perc": 0.96551724137931
                  },
                  {
                    "": 155,
                    "date": "2020-02-08T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 36,
                    "perc": 1.24137931034483
                  },
                  {
                    "": 156,
                    "date": "2020-02-09T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 28,
                    "perc": 0.96551724137931
                  },
                  {
                    "": 157,
                    "date": "2020-02-10T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 125,
                    "perc": 4.31034482758621
                  },
                  {
                    "": 158,
                    "date": "2020-02-11T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 106,
                    "perc": 3.6551724137931
                  },
                  {
                    "": 159,
                    "date": "2020-02-12T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 15,
                    "perc": 0.517241379310345
                  },
                  {
                    "": 160,
                    "date": "2020-02-13T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 7,
                    "perc": 0.241379310344828
                  },
                  {
                    "": 161,
                    "date": "2020-02-14T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 211,
                    "perc": 7.27586206896552
                  },
                  {
                    "": 162,
                    "date": "2020-02-15T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 69,
                    "perc": 2.37931034482759
                  },
                  {
                    "": 163,
                    "date": "2020-02-16T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 32,
                    "perc": 1.10344827586207
                  },
                  {
                    "": 164,
                    "date": "2020-02-17T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 26,
                    "perc": 0.896551724137931
                  },
                  {
                    "": 165,
                    "date": "2020-02-18T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 4,
                    "perc": 0.137931034482759
                  },
                  {
                    "": 166,
                    "date": "2020-02-19T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 50,
                    "perc": 1.72413793103448
                  },
                  {
                    "": 167,
                    "date": "2020-02-20T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 56,
                    "perc": 1.93103448275862
                  },
                  {
                    "": 168,
                    "date": "2020-02-21T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 33,
                    "perc": 1.13793103448276
                  },
                  {
                    "": 169,
                    "date": "2020-02-22T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 30,
                    "perc": 1.03448275862069
                  },
                  {
                    "": 170,
                    "date": "2020-02-23T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 47,
                    "perc": 1.62068965517241
                  },
                  {
                    "": 171,
                    "date": "2020-02-24T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 88,
                    "perc": 3.03448275862069
                  },
                  {
                    "": 172,
                    "date": "2020-02-25T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 32,
                    "perc": 1.10344827586207
                  },
                  {
                    "": 173,
                    "date": "2020-02-26T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 130,
                    "perc": 4.48275862068965
                  },
                  {
                    "": 174,
                    "date": "2020-02-27T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 179,
                    "perc": 6.17241379310345
                  },
                  {
                    "": 175,
                    "date": "2020-02-28T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 174,
                    "perc": 6
                  },
                  {
                    "": 176,
                    "date": "2020-02-29T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 30,
                    "perc": 1.03448275862069
                  },
                  {
                    "": 177,
                    "date": "2020-03-01T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 186,
                    "perc": 6.41379310344828
                  },
                  {
                    "": 178,
                    "date": "2020-03-02T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 145,
                    "perc": 5
                  },
                  {
                    "": 179,
                    "date": "2020-03-03T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 154,
                    "perc": 5.31034482758621
                  },
                  {
                    "": 180,
                    "date": "2020-03-04T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 155,
                    "perc": 5.3448275862069
                  },
                  {
                    "": 181,
                    "date": "2020-03-05T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 2,
                    "perc": 0.0689655172413793
                  },
                  {
                    "": 182,
                    "date": "2020-03-06T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 149,
                    "perc": 5.13793103448276
                  },
                  {
                    "": 183,
                    "date": "2020-03-07T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 185,
                    "perc": 6.37931034482759
                  },
                  {
                    "": 184,
                    "date": "2020-03-08T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 209,
                    "perc": 7.20689655172414
                  },
                  {
                    "": 185,
                    "date": "2020-03-09T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 49,
                    "perc": 1.68965517241379
                  },
                  {
                    "": 186,
                    "date": "2020-03-10T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 155,
                    "perc": 5.3448275862069
                  },
                  {
                    "": 187,
                    "date": "2020-03-11T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 52,
                    "perc": 1.79310344827586
                  },
                  {
                    "": 188,
                    "date": "2020-03-12T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 43,
                    "perc": 1.48275862068966
                  },
                  {
                    "": 189,
                    "date": "2020-03-13T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 22,
                    "perc": 0.758620689655172
                  },
                  {
                    "": 190,
                    "date": "2020-03-14T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 26,
                    "perc": 0.896551724137931
                  },
                  {
                    "": 191,
                    "date": "2020-03-15T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 4,
                    "perc": 0.137931034482759
                  },
                  {
                    "": 192,
                    "date": "2020-03-16T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 23,
                    "perc": 0.793103448275862
                  },
                  {
                    "": 193,
                    "date": "2020-03-17T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 34,
                    "perc": 1.17241379310345
                  },
                  {
                    "": 194,
                    "date": "2020-03-18T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 35,
                    "perc": 1.20689655172414
                  },
                  {
                    "": 195,
                    "date": "2020-03-19T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 36,
                    "perc": 1.24137931034483
                  },
                  {
                    "": 196,
                    "date": "2020-03-20T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 24,
                    "perc": 0.827586206896552
                  },
                  {
                    "": 197,
                    "date": "2020-03-21T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 30,
                    "perc": 1.03448275862069
                  },
                  {
                    "": 198,
                    "date": "2020-03-22T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 65,
                    "perc": 2.24137931034483
                  },
                  {
                    "": 199,
                    "date": "2020-03-23T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 11,
                    "perc": 0.379310344827586
                  },
                  {
                    "": 200,
                    "date": "2020-03-24T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 12,
                    "perc": 0.413793103448276
                  },
                  {
                    "": 201,
                    "date": "2020-03-25T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 9,
                    "perc": 0.310344827586207
                  },
                  {
                    "": 202,
                    "date": "2020-03-26T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 19,
                    "perc": 0.655172413793103
                  },
                  {
                    "": 203,
                    "date": "2020-03-27T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 14,
                    "perc": 0.482758620689655
                  },
                  {
                    "": 204,
                    "date": "2020-03-28T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 6,
                    "perc": 0.206896551724138
                  },
                  {
                    "": 205,
                    "date": "2020-03-31T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 1,
                    "perc": 0.0344827586206897
                  },
                  {
                    "": 206,
                    "date": "2020-04-03T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 12,
                    "perc": 0.413793103448276
                  },
                  {
                    "": 207,
                    "date": "2020-04-04T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 1,
                    "perc": 0.0344827586206897
                  },
                  {
                    "": 208,
                    "date": "2020-04-06T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 2,
                    "perc": 0.0689655172413793
                  },
                  {
                    "": 209,
                    "date": "2020-04-07T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 5,
                    "perc": 0.172413793103448
                  },
                  {
                    "": 210,
                    "date": "2020-04-08T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 4,
                    "perc": 0.137931034482759
                  },
                  {
                    "": 211,
                    "date": "2020-04-09T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 2,
                    "perc": 0.0689655172413793
                  },
                  {
                    "": 212,
                    "date": "2020-04-10T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 1,
                    "perc": 0.0344827586206897
                  },
                  {
                    "": 213,
                    "date": "2020-04-12T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 1,
                    "perc": 0.0344827586206897
                  },
                  {
                    "": 214,
                    "date": "2020-04-13T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 4,
                    "perc": 0.137931034482759
                  },
                  {
                    "": 215,
                    "date": "2020-04-14T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 14,
                    "perc": 0.482758620689655
                  },
                  {
                    "": 216,
                    "date": "2020-04-15T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 5,
                    "perc": 0.172413793103448
                  },
                  {
                    "": 217,
                    "date": "2020-04-17T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 4,
                    "perc": 0.137931034482759
                  },
                  {
                    "": 218,
                    "date": "2020-04-18T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 6,
                    "perc": 0.206896551724138
                  },
                  {
                    "": 219,
                    "date": "2020-04-19T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 5,
                    "perc": 0.172413793103448
                  },
                  {
                    "": 220,
                    "date": "2020-04-20T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 3,
                    "perc": 0.103448275862069
                  },
                  {
                    "": 221,
                    "date": "2020-04-21T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 3,
                    "perc": 0.103448275862069
                  },
                  {
                    "": 222,
                    "date": "2020-04-22T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 1,
                    "perc": 0.0344827586206897
                  },
                  {
                    "": 223,
                    "date": "2020-04-25T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 2,
                    "perc": 0.0689655172413793
                  },
                  {
                    "": 224,
                    "date": "2020-04-26T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 9,
                    "perc": 0.310344827586207
                  },
                  {
                    "": 225,
                    "date": "2020-04-27T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 4,
                    "perc": 0.137931034482759
                  },
                  {
                    "": 226,
                    "date": "2020-04-28T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 6,
                    "perc": 0.206896551724138
                  },
                  {
                    "": 227,
                    "date": "2020-04-29T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 21,
                    "perc": 0.724137931034483
                  },
                  {
                    "": 228,
                    "date": "2020-04-30T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 5,
                    "perc": 0.172413793103448
                  },
                  {
                    "": 229,
                    "date": "2020-05-01T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 18,
                    "perc": 0.620689655172414
                  },
                  {
                    "": 230,
                    "date": "2020-05-02T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 21,
                    "perc": 0.724137931034483
                  },
                  {
                    "": 231,
                    "date": "2020-05-03T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 5,
                    "perc": 0.172413793103448
                  },
                  {
                    "": 232,
                    "date": "2020-05-04T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 1,
                    "perc": 0.0344827586206897
                  },
                  {
                    "": 233,
                    "date": "2020-05-05T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 3,
                    "perc": 0.103448275862069
                  },
                  {
                    "": 234,
                    "date": "2020-05-06T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 29,
                    "perc": 1
                  },
                  {
                    "": 235,
                    "date": "2020-05-07T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 1,
                    "perc": 0.0344827586206897
                  },
                  {
                    "": 236,
                    "date": "2020-05-10T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 1,
                    "perc": 0.0344827586206897
                  },
                  {
                    "": 237,
                    "date": "2020-05-11T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 30,
                    "perc": 1.03448275862069
                  },
                  {
                    "": 238,
                    "date": "2020-05-12T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 23,
                    "perc": 0.793103448275862
                  },
                  {
                    "": 239,
                    "date": "2020-05-13T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 5,
                    "perc": 0.172413793103448
                  },
                  {
                    "": 240,
                    "date": "2020-05-14T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 15,
                    "perc": 0.517241379310345
                  },
                  {
                    "": 241,
                    "date": "2020-05-15T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 10,
                    "perc": 0.344827586206897
                  },
                  {
                    "": 242,
                    "date": "2020-05-16T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 1,
                    "perc": 0.0344827586206897
                  },
                  {
                    "": 243,
                    "date": "2020-05-17T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 4,
                    "perc": 0.137931034482759
                  },
                  {
                    "": 244,
                    "date": "2020-05-18T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 1,
                    "perc": 0.0344827586206897
                  },
                  {
                    "": 245,
                    "date": "2020-05-19T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 7,
                    "perc": 0.241379310344828
                  },
                  {
                    "": 246,
                    "date": "2020-05-20T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 12,
                    "perc": 0.413793103448276
                  },
                  {
                    "": 247,
                    "date": "2020-05-21T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 29,
                    "perc": 1
                  },
                  {
                    "": 248,
                    "date": "2020-05-22T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 2,
                    "perc": 0.0689655172413793
                  },
                  {
                    "": 249,
                    "date": "2020-05-23T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 13,
                    "perc": 0.448275862068966
                  },
                  {
                    "": 250,
                    "date": "2020-05-24T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 50,
                    "perc": 1.72413793103448
                  },
                  {
                    "": 251,
                    "date": "2020-05-25T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 4,
                    "perc": 0.137931034482759
                  },
                  {
                    "": 252,
                    "date": "2020-05-26T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 3,
                    "perc": 0.103448275862069
                  },
                  {
                    "": 253,
                    "date": "2020-05-27T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 21,
                    "perc": 0.724137931034483
                  },
                  {
                    "": 254,
                    "date": "2020-05-28T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 4,
                    "perc": 0.137931034482759
                  },
                  {
                    "": 255,
                    "date": "2020-05-29T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 1,
                    "perc": 0.0344827586206897
                  },
                  {
                    "": 256,
                    "date": "2020-05-30T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 25,
                    "perc": 0.862068965517241
                  },
                  {
                    "": 257,
                    "date": "2020-05-31T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 25,
                    "perc": 0.862068965517241
                  },
                  {
                    "": 258,
                    "date": "2020-06-01T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 27,
                    "perc": 0.931034482758621
                  },
                  {
                    "": 259,
                    "date": "2020-06-02T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 43,
                    "perc": 1.48275862068966
                  },
                  {
                    "": 260,
                    "date": "2020-06-03T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 12,
                    "perc": 0.413793103448276
                  },
                  {
                    "": 261,
                    "date": "2020-06-04T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 40,
                    "perc": 1.37931034482759
                  },
                  {
                    "": 262,
                    "date": "2020-06-05T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 51,
                    "perc": 1.75862068965517
                  },
                  {
                    "": 263,
                    "date": "2020-06-06T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 38,
                    "perc": 1.31034482758621
                  },
                  {
                    "": 264,
                    "date": "2020-06-07T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 27,
                    "perc": 0.931034482758621
                  },
                  {
                    "": 265,
                    "date": "2020-06-08T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 17,
                    "perc": 0.586206896551724
                  },
                  {
                    "": 266,
                    "date": "2020-06-09T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 22,
                    "perc": 0.758620689655172
                  },
                  {
                    "": 267,
                    "date": "2020-06-10T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 15,
                    "perc": 0.517241379310345
                  },
                  {
                    "": 268,
                    "date": "2020-06-11T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 50,
                    "perc": 1.72413793103448
                  },
                  {
                    "": 269,
                    "date": "2020-06-12T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 66,
                    "perc": 2.27586206896552
                  },
                  {
                    "": 270,
                    "date": "2020-06-13T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 52,
                    "perc": 1.79310344827586
                  },
                  {
                    "": 271,
                    "date": "2020-06-14T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 63,
                    "perc": 2.17241379310345
                  },
                  {
                    "": 272,
                    "date": "2020-06-15T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 66,
                    "perc": 2.27586206896552
                  },
                  {
                    "": 273,
                    "date": "2020-06-16T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 90,
                    "perc": 3.10344827586207
                  },
                  {
                    "": 274,
                    "date": "2020-06-17T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 79,
                    "perc": 2.72413793103448
                  },
                  {
                    "": 275,
                    "date": "2020-06-18T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 66,
                    "perc": 2.27586206896552
                  },
                  {
                    "": 276,
                    "date": "2020-06-19T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 35,
                    "perc": 1.20689655172414
                  },
                  {
                    "": 277,
                    "date": "2020-06-20T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 52,
                    "perc": 1.79310344827586
                  },
                  {
                    "": 278,
                    "date": "2020-06-21T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 18,
                    "perc": 0.620689655172414
                  },
                  {
                    "": 279,
                    "date": "2020-06-22T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 37,
                    "perc": 1.27586206896552
                  },
                  {
                    "": 280,
                    "date": "2020-06-23T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 18,
                    "perc": 0.620689655172414
                  },
                  {
                    "": 281,
                    "date": "2020-06-24T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 5,
                    "perc": 0.172413793103448
                  },
                  {
                    "": 282,
                    "date": "2020-06-25T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 41,
                    "perc": 1.41379310344828
                  },
                  {
                    "": 283,
                    "date": "2020-06-26T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 54,
                    "perc": 1.86206896551724
                  },
                  {
                    "": 284,
                    "date": "2020-06-27T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 53,
                    "perc": 1.82758620689655
                  },
                  {
                    "": 285,
                    "date": "2020-06-28T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 26,
                    "perc": 0.896551724137931
                  },
                  {
                    "": 286,
                    "date": "2020-06-29T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 32,
                    "perc": 1.10344827586207
                  },
                  {
                    "": 287,
                    "date": "2020-06-30T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 35,
                    "perc": 1.20689655172414
                  },
                  {
                    "": 288,
                    "date": "2020-07-01T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 37,
                    "perc": 1.27586206896552
                  },
                  {
                    "": 289,
                    "date": "2020-07-02T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 57,
                    "perc": 1.96551724137931
                  },
                  {
                    "": 290,
                    "date": "2020-07-03T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 52,
                    "perc": 1.79310344827586
                  },
                  {
                    "": 291,
                    "date": "2020-07-04T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 62,
                    "perc": 2.13793103448276
                  },
                  {
                    "": 292,
                    "date": "2020-07-05T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 8,
                    "perc": 0.275862068965517
                  },
                  {
                    "": 293,
                    "date": "2020-07-06T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 47,
                    "perc": 1.62068965517241
                  },
                  {
                    "": 294,
                    "date": "2020-07-07T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 72,
                    "perc": 2.48275862068966
                  },
                  {
                    "": 295,
                    "date": "2020-07-08T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 94,
                    "perc": 3.24137931034483
                  },
                  {
                    "": 296,
                    "date": "2020-07-09T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 82,
                    "perc": 2.82758620689655
                  },
                  {
                    "": 297,
                    "date": "2020-07-10T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 59,
                    "perc": 2.03448275862069
                  },
                  {
                    "": 298,
                    "date": "2020-07-11T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 93,
                    "perc": 3.20689655172414
                  },
                  {
                    "": 299,
                    "date": "2020-07-12T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 89,
                    "perc": 3.06896551724138
                  },
                  {
                    "": 300,
                    "date": "2020-07-13T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 90,
                    "perc": 3.10344827586207
                  },
                  {
                    "": 301,
                    "date": "2020-07-14T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 76,
                    "perc": 2.62068965517241
                  },
                  {
                    "": 302,
                    "date": "2020-07-15T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 59,
                    "perc": 2.03448275862069
                  },
                  {
                    "": 303,
                    "date": "2020-07-16T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 72,
                    "perc": 2.48275862068966
                  },
                  {
                    "": 304,
                    "date": "2020-07-17T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 85,
                    "perc": 2.93103448275862
                  },
                  {
                    "": 305,
                    "date": "2020-07-18T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 84,
                    "perc": 2.89655172413793
                  },
                  {
                    "": 306,
                    "date": "2020-07-19T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 95,
                    "perc": 3.27586206896552
                  },
                  {
                    "": 307,
                    "date": "2020-07-20T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 100,
                    "perc": 3.44827586206897
                  },
                  {
                    "": 308,
                    "date": "2020-07-21T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 65,
                    "perc": 2.24137931034483
                  },
                  {
                    "": 309,
                    "date": "2020-07-22T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 87,
                    "perc": 3
                  },
                  {
                    "": 310,
                    "date": "2020-07-23T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 78,
                    "perc": 2.68965517241379
                  },
                  {
                    "": 311,
                    "date": "2020-07-24T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 94,
                    "perc": 3.24137931034483
                  },
                  {
                    "": 312,
                    "date": "2020-07-25T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 93,
                    "perc": 3.20689655172414
                  },
                  {
                    "": 313,
                    "date": "2020-07-26T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 94,
                    "perc": 3.24137931034483
                  },
                  {
                    "": 314,
                    "date": "2020-07-27T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 86,
                    "perc": 2.96551724137931
                  },
                  {
                    "": 315,
                    "date": "2020-07-28T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 90,
                    "perc": 3.10344827586207
                  },
                  {
                    "": 316,
                    "date": "2020-07-29T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 73,
                    "perc": 2.51724137931034
                  },
                  {
                    "": 317,
                    "date": "2020-07-30T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 66,
                    "perc": 2.27586206896552
                  },
                  {
                    "": 318,
                    "date": "2020-07-31T00:00:00.000Z",
                    "destination_type": "heliport",
                    "count": 26,
                    "perc": 0.896551724137931
                  },
                  {
                    "": 319,
                    "date": "2020-01-01T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 39928,
                    "perc": 0.869918142488095
                  },
                  {
                    "": 320,
                    "date": "2020-01-02T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46859,
                    "perc": 1.02092502100906
                  },
                  {
                    "": 321,
                    "date": "2020-01-03T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 48378,
                    "perc": 1.05401973295154
                  },
                  {
                    "": 322,
                    "date": "2020-01-04T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 44395,
                    "perc": 0.967241432973326
                  },
                  {
                    "": 323,
                    "date": "2020-01-05T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46264,
                    "perc": 1.00796165457997
                  },
                  {
                    "": 324,
                    "date": "2020-01-06T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 49043,
                    "perc": 1.06850820131346
                  },
                  {
                    "": 325,
                    "date": "2020-01-07T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46423,
                    "perc": 1.01142581468455
                  },
                  {
                    "": 326,
                    "date": "2020-01-08T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46275,
                    "perc": 1.00820131345513
                  },
                  {
                    "": 327,
                    "date": "2020-01-09T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 48224,
                    "perc": 1.05066450869931
                  },
                  {
                    "": 328,
                    "date": "2020-01-10T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 49416,
                    "perc": 1.07663481589841
                  },
                  {
                    "": 329,
                    "date": "2020-01-11T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 42219,
                    "perc": 0.919832550032681
                  },
                  {
                    "": 330,
                    "date": "2020-01-12T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 43666,
                    "perc": 0.951358585701391
                  },
                  {
                    "": 331,
                    "date": "2020-01-13T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 47139,
                    "perc": 1.02702542874039
                  },
                  {
                    "": 332,
                    "date": "2020-01-14T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 44988,
                    "perc": 0.980161225061471
                  },
                  {
                    "": 333,
                    "date": "2020-01-15T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 45477,
                    "perc": 0.990815151420835
                  },
                  {
                    "": 334,
                    "date": "2020-01-16T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46259,
                    "perc": 1.00785271872763
                  },
                  {
                    "": 335,
                    "date": "2020-01-17T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 48144,
                    "perc": 1.04892153506178
                  },
                  {
                    "": 336,
                    "date": "2020-01-18T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 35793,
                    "perc": 0.779828192598587
                  },
                  {
                    "": 337,
                    "date": "2020-01-19T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 42226,
                    "perc": 0.919985060225964
                  },
                  {
                    "": 338,
                    "date": "2020-01-20T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 45946,
                    "perc": 1.00103333437082
                  },
                  {
                    "": 339,
                    "date": "2020-01-21T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46040,
                    "perc": 1.00308132839491
                  },
                  {
                    "": 340,
                    "date": "2020-01-22T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46051,
                    "perc": 1.00332098727007
                  },
                  {
                    "": 341,
                    "date": "2020-01-23T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 48535,
                    "perc": 1.05744031871518
                  },
                  {
                    "": 342,
                    "date": "2020-01-24T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 48989,
                    "perc": 1.06733169410813
                  },
                  {
                    "": 343,
                    "date": "2020-01-25T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 42565,
                    "perc": 0.927370911014971
                  },
                  {
                    "": 344,
                    "date": "2020-01-26T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 42698,
                    "perc": 0.930268604687354
                  },
                  {
                    "": 345,
                    "date": "2020-01-27T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 47589,
                    "perc": 1.03682965545146
                  },
                  {
                    "": 346,
                    "date": "2020-01-28T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46355,
                    "perc": 1.00994428709266
                  },
                  {
                    "": 347,
                    "date": "2020-01-29T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 44935,
                    "perc": 0.979006505026611
                  },
                  {
                    "": 348,
                    "date": "2020-01-30T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 47107,
                    "perc": 1.02632823928538
                  },
                  {
                    "": 349,
                    "date": "2020-01-31T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 49030,
                    "perc": 1.06822496809736
                  },
                  {
                    "": 350,
                    "date": "2020-02-01T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 43033,
                    "perc": 0.937567306794485
                  },
                  {
                    "": 351,
                    "date": "2020-02-02T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 42947,
                    "perc": 0.935693610134147
                  },
                  {
                    "": 352,
                    "date": "2020-02-03T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 48017,
                    "perc": 1.04615456441221
                  },
                  {
                    "": 353,
                    "date": "2020-02-04T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 47126,
                    "perc": 1.02674219552429
                  },
                  {
                    "": 354,
                    "date": "2020-02-05T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46634,
                    "perc": 1.01602290765352
                  },
                  {
                    "": 355,
                    "date": "2020-02-06T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 47576,
                    "perc": 1.03654642223536
                  },
                  {
                    "": 356,
                    "date": "2020-02-07T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 48906,
                    "perc": 1.0655233589592
                  },
                  {
                    "": 357,
                    "date": "2020-02-08T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 43348,
                    "perc": 0.944430265492234
                  },
                  {
                    "": 358,
                    "date": "2020-02-09T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 42471,
                    "perc": 0.925322916990881
                  },
                  {
                    "": 359,
                    "date": "2020-02-10T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 47557,
                    "perc": 1.03613246599645
                  },
                  {
                    "": 360,
                    "date": "2020-02-11T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46642,
                    "perc": 1.01619720501727
                  },
                  {
                    "": 361,
                    "date": "2020-02-12T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 47016,
                    "perc": 1.0243456067727
                  },
                  {
                    "": 362,
                    "date": "2020-02-13T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 48414,
                    "perc": 1.05480407108842
                  },
                  {
                    "": 363,
                    "date": "2020-02-14T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 50801,
                    "perc": 1.10681004699804
                  },
                  {
                    "": 364,
                    "date": "2020-02-15T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 43960,
                    "perc": 0.957764013819291
                  },
                  {
                    "": 365,
                    "date": "2020-02-16T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 44148,
                    "perc": 0.961860001867472
                  },
                  {
                    "": 366,
                    "date": "2020-02-17T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 47502,
                    "perc": 1.03493417162065
                  },
                  {
                    "": 367,
                    "date": "2020-02-18T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 47475,
                    "perc": 1.03434591801799
                  },
                  {
                    "": 368,
                    "date": "2020-02-19T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 48184,
                    "perc": 1.04979302188054
                  },
                  {
                    "": 369,
                    "date": "2020-02-20T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 49445,
                    "perc": 1.07726664384201
                  },
                  {
                    "": 370,
                    "date": "2020-02-21T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 50668,
                    "perc": 1.10391235332566
                  },
                  {
                    "": 371,
                    "date": "2020-02-22T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 44469,
                    "perc": 0.968853683588036
                  },
                  {
                    "": 372,
                    "date": "2020-02-23T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 45659,
                    "perc": 0.994780416446201
                  },
                  {
                    "": 373,
                    "date": "2020-02-24T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 48683,
                    "perc": 1.0606648199446
                  },
                  {
                    "": 374,
                    "date": "2020-02-25T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46642,
                    "perc": 1.01619720501727
                  },
                  {
                    "": 375,
                    "date": "2020-02-26T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 47683,
                    "perc": 1.03887764947555
                  },
                  {
                    "": 376,
                    "date": "2020-02-27T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 50039,
                    "perc": 1.09020822310063
                  },
                  {
                    "": 377,
                    "date": "2020-02-28T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 51090,
                    "perc": 1.11310653926359
                  },
                  {
                    "": 378,
                    "date": "2020-02-29T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 43933,
                    "perc": 0.957175760216627
                  },
                  {
                    "": 379,
                    "date": "2020-03-01T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 45178,
                    "perc": 0.98430078745059
                  },
                  {
                    "": 380,
                    "date": "2020-03-02T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 48887,
                    "perc": 1.06510940272028
                  },
                  {
                    "": 381,
                    "date": "2020-03-03T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46515,
                    "perc": 1.01343023436771
                  },
                  {
                    "": 382,
                    "date": "2020-03-04T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 47723,
                    "perc": 1.03974913629431
                  },
                  {
                    "": 383,
                    "date": "2020-03-05T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 49161,
                    "perc": 1.0710790874288
                  },
                  {
                    "": 384,
                    "date": "2020-03-06T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 48591,
                    "perc": 1.05866040026145
                  },
                  {
                    "": 385,
                    "date": "2020-03-07T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 43657,
                    "perc": 0.95116250116717
                  },
                  {
                    "": 386,
                    "date": "2020-03-08T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46566,
                    "perc": 1.01454138006163
                  },
                  {
                    "": 387,
                    "date": "2020-03-09T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 48159,
                    "perc": 1.04924834261882
                  },
                  {
                    "": 388,
                    "date": "2020-03-10T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 45254,
                    "perc": 0.985956612406237
                  },
                  {
                    "": 389,
                    "date": "2020-03-11T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46609,
                    "perc": 1.0154782283918
                  },
                  {
                    "": 390,
                    "date": "2020-03-12T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 46792,
                    "perc": 1.01946528058763
                  },
                  {
                    "": 391,
                    "date": "2020-03-13T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 45883,
                    "perc": 0.999660742631268
                  },
                  {
                    "": 392,
                    "date": "2020-03-14T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 40123,
                    "perc": 0.874166640729559
                  },
                  {
                    "": 393,
                    "date": "2020-03-15T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 40057,
                    "perc": 0.872728687478602
                  },
                  {
                    "": 394,
                    "date": "2020-03-16T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 39710,
                    "perc": 0.865168539325843
                  },
                  {
                    "": 395,
                    "date": "2020-03-17T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 37714,
                    "perc": 0.821681347069626
                  },
                  {
                    "": 396,
                    "date": "2020-03-18T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 35784,
                    "perc": 0.779632108064366
                  },
                  {
                    "": 397,
                    "date": "2020-03-19T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 34044,
                    "perc": 0.741722431448224
                  },
                  {
                    "": 398,
                    "date": "2020-03-20T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 32489,
                    "perc": 0.707843381368857
                  },
                  {
                    "": 399,
                    "date": "2020-03-21T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 26346,
                    "perc": 0.574004793177503
                  },
                  {
                    "": 400,
                    "date": "2020-03-22T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 24284,
                    "perc": 0.529079647670329
                  },
                  {
                    "": 401,
                    "date": "2020-03-23T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 22068,
                    "perc": 0.480799277910922
                  },
                  {
                    "": 402,
                    "date": "2020-03-24T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 21774,
                    "perc": 0.474393849793022
                  },
                  {
                    "": 403,
                    "date": "2020-03-25T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 18609,
                    "perc": 0.405437455258489
                  },
                  {
                    "": 404,
                    "date": "2020-03-26T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 18605,
                    "perc": 0.405350306576613
                  },
                  {
                    "": 405,
                    "date": "2020-03-27T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 17360,
                    "perc": 0.37822527934265
                  },
                  {
                    "": 406,
                    "date": "2020-03-28T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 15118,
                    "perc": 0.329378443151047
                  },
                  {
                    "": 407,
                    "date": "2020-03-29T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 14467,
                    "perc": 0.315194995175698
                  },
                  {
                    "": 408,
                    "date": "2020-03-30T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 14569,
                    "perc": 0.317417286563541
                  },
                  {
                    "": 409,
                    "date": "2020-03-31T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 14569,
                    "perc": 0.317417286563541
                  },
                  {
                    "": 410,
                    "date": "2020-04-01T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 14520,
                    "perc": 0.316349715210557
                  },
                  {
                    "": 411,
                    "date": "2020-04-02T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 13833,
                    "perc": 0.301381929098322
                  },
                  {
                    "": 412,
                    "date": "2020-04-03T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 13382,
                    "perc": 0.291555915216782
                  },
                  {
                    "": 413,
                    "date": "2020-04-04T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11059,
                    "perc": 0.240944318217187
                  },
                  {
                    "": 414,
                    "date": "2020-04-05T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 10996,
                    "perc": 0.239571726477637
                  },
                  {
                    "": 415,
                    "date": "2020-04-06T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 12187,
                    "perc": 0.265520246506272
                  },
                  {
                    "": 416,
                    "date": "2020-04-07T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 12570,
                    "perc": 0.273864732795916
                  },
                  {
                    "": 417,
                    "date": "2020-04-08T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 12180,
                    "perc": 0.265367736312988
                  },
                  {
                    "": 418,
                    "date": "2020-04-09T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 12007,
                    "perc": 0.261598555821843
                  },
                  {
                    "": 419,
                    "date": "2020-04-10T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11525,
                    "perc": 0.251097139655763
                  },
                  {
                    "": 420,
                    "date": "2020-04-11T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 9933,
                    "perc": 0.21641196426904
                  },
                  {
                    "": 421,
                    "date": "2020-04-12T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 9065,
                    "perc": 0.197500700301908
                  },
                  {
                    "": 422,
                    "date": "2020-04-13T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 9917,
                    "perc": 0.216063369541536
                  },
                  {
                    "": 423,
                    "date": "2020-04-14T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11271,
                    "perc": 0.245563198356625
                  },
                  {
                    "": 424,
                    "date": "2020-04-15T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11296,
                    "perc": 0.246107877618351
                  },
                  {
                    "": 425,
                    "date": "2020-04-16T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11058,
                    "perc": 0.240922531046718
                  },
                  {
                    "": 426,
                    "date": "2020-04-17T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 10904,
                    "perc": 0.237567306794485
                  },
                  {
                    "": 427,
                    "date": "2020-04-18T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 8943,
                    "perc": 0.194842665504684
                  },
                  {
                    "": 428,
                    "date": "2020-04-19T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 8670,
                    "perc": 0.188894767966635
                  },
                  {
                    "": 429,
                    "date": "2020-04-20T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 9525,
                    "perc": 0.207522798717669
                  },
                  {
                    "": 430,
                    "date": "2020-04-21T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 10768,
                    "perc": 0.234604251610694
                  },
                  {
                    "": 431,
                    "date": "2020-04-22T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11046,
                    "perc": 0.240661085001089
                  },
                  {
                    "": 432,
                    "date": "2020-04-23T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11250,
                    "perc": 0.245105667776775
                  },
                  {
                    "": 433,
                    "date": "2020-04-24T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 10910,
                    "perc": 0.237698029817299
                  },
                  {
                    "": 434,
                    "date": "2020-04-25T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 9110,
                    "perc": 0.198481122973015
                  },
                  {
                    "": 435,
                    "date": "2020-04-26T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 8867,
                    "perc": 0.193186840549037
                  },
                  {
                    "": 436,
                    "date": "2020-04-27T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 10030,
                    "perc": 0.218525319804538
                  },
                  {
                    "": 437,
                    "date": "2020-04-28T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11071,
                    "perc": 0.241205764262816
                  },
                  {
                    "": 438,
                    "date": "2020-04-29T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11431,
                    "perc": 0.249049145631672
                  },
                  {
                    "": 439,
                    "date": "2020-04-30T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11542,
                    "perc": 0.251467521553737
                  },
                  {
                    "": 440,
                    "date": "2020-05-01T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11925,
                    "perc": 0.259812007843381
                  },
                  {
                    "": 441,
                    "date": "2020-05-02T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 9805,
                    "perc": 0.213623206449002
                  },
                  {
                    "": 442,
                    "date": "2020-05-03T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 10086,
                    "perc": 0.219745401350805
                  },
                  {
                    "": 443,
                    "date": "2020-05-04T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 10749,
                    "perc": 0.234190295371783
                  },
                  {
                    "": 444,
                    "date": "2020-05-05T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11695,
                    "perc": 0.254800958635501
                  },
                  {
                    "": 445,
                    "date": "2020-05-06T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11444,
                    "perc": 0.24933237884777
                  },
                  {
                    "": 446,
                    "date": "2020-05-07T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 12963,
                    "perc": 0.282427090790252
                  },
                  {
                    "": 447,
                    "date": "2020-05-08T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 12387,
                    "perc": 0.269877680600081
                  },
                  {
                    "": 448,
                    "date": "2020-05-09T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 9927,
                    "perc": 0.216281241246226
                  },
                  {
                    "": 449,
                    "date": "2020-05-10T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 9765,
                    "perc": 0.212751719630241
                  },
                  {
                    "": 450,
                    "date": "2020-05-11T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 10933,
                    "perc": 0.238199134738087
                  },
                  {
                    "": 451,
                    "date": "2020-05-12T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11921,
                    "perc": 0.259724859161505
                  },
                  {
                    "": 452,
                    "date": "2020-05-13T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 12580,
                    "perc": 0.274082604500607
                  },
                  {
                    "": 453,
                    "date": "2020-05-14T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 13103,
                    "perc": 0.285477294655918
                  },
                  {
                    "": 454,
                    "date": "2020-05-15T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 12922,
                    "perc": 0.281533816801021
                  },
                  {
                    "": 455,
                    "date": "2020-05-16T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 10822,
                    "perc": 0.235780758816023
                  },
                  {
                    "": 456,
                    "date": "2020-05-17T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 10333,
                    "perc": 0.225126832456659
                  },
                  {
                    "": 457,
                    "date": "2020-05-18T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11575,
                    "perc": 0.252186498179215
                  },
                  {
                    "": 458,
                    "date": "2020-05-19T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 12358,
                    "perc": 0.269245852656479
                  },
                  {
                    "": 459,
                    "date": "2020-05-20T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 13486,
                    "perc": 0.293821780945563
                  },
                  {
                    "": 460,
                    "date": "2020-05-21T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 13455,
                    "perc": 0.293146378661023
                  },
                  {
                    "": 461,
                    "date": "2020-05-22T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 13868,
                    "perc": 0.302144480064739
                  },
                  {
                    "": 462,
                    "date": "2020-05-23T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11111,
                    "perc": 0.242077251081577
                  },
                  {
                    "": 463,
                    "date": "2020-05-24T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 10614,
                    "perc": 0.231249027358461
                  },
                  {
                    "": 464,
                    "date": "2020-05-25T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11664,
                    "perc": 0.25412555635096
                  },
                  {
                    "": 465,
                    "date": "2020-05-26T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 12530,
                    "perc": 0.272993245977155
                  },
                  {
                    "": 466,
                    "date": "2020-05-27T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 13900,
                    "perc": 0.302841669519749
                  },
                  {
                    "": 467,
                    "date": "2020-05-28T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 14260,
                    "perc": 0.310685050888605
                  },
                  {
                    "": 468,
                    "date": "2020-05-29T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 14225,
                    "perc": 0.309922499922189
                  },
                  {
                    "": 469,
                    "date": "2020-05-30T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11662,
                    "perc": 0.254081982010022
                  },
                  {
                    "": 470,
                    "date": "2020-05-31T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 11790,
                    "perc": 0.25687073983006
                  },
                  {
                    "": 471,
                    "date": "2020-06-01T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 13554,
                    "perc": 0.295303308537458
                  },
                  {
                    "": 472,
                    "date": "2020-06-02T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 14391,
                    "perc": 0.31353917022005
                  },
                  {
                    "": 473,
                    "date": "2020-06-03T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 15582,
                    "perc": 0.339487690248685
                  },
                  {
                    "": 474,
                    "date": "2020-06-04T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 15852,
                    "perc": 0.345370226275328
                  },
                  {
                    "": 475,
                    "date": "2020-06-05T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 15813,
                    "perc": 0.344520526627035
                  },
                  {
                    "": 476,
                    "date": "2020-06-06T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 13115,
                    "perc": 0.285738740701547
                  },
                  {
                    "": 477,
                    "date": "2020-06-07T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 13500,
                    "perc": 0.29412680133213
                  },
                  {
                    "": 478,
                    "date": "2020-06-08T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 14901,
                    "perc": 0.324650627159264
                  },
                  {
                    "": 479,
                    "date": "2020-06-09T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 15696,
                    "perc": 0.341971427682156
                  },
                  {
                    "": 480,
                    "date": "2020-06-10T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 16289,
                    "perc": 0.354891219770301
                  },
                  {
                    "": 481,
                    "date": "2020-06-11T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 17054,
                    "perc": 0.371558405179122
                  },
                  {
                    "": 482,
                    "date": "2020-06-12T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 17103,
                    "perc": 0.372625976532105
                  },
                  {
                    "": 483,
                    "date": "2020-06-13T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 14370,
                    "perc": 0.3130816396402
                  },
                  {
                    "": 484,
                    "date": "2020-06-14T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 14943,
                    "perc": 0.325565688318964
                  },
                  {
                    "": 485,
                    "date": "2020-06-15T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 16894,
                    "perc": 0.368072457904074
                  },
                  {
                    "": 486,
                    "date": "2020-06-16T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 17207,
                    "perc": 0.374891842260886
                  },
                  {
                    "": 487,
                    "date": "2020-06-17T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 17750,
                    "perc": 0.386722275825578
                  },
                  {
                    "": 488,
                    "date": "2020-06-18T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 18782,
                    "perc": 0.409206635749634
                  },
                  {
                    "": 489,
                    "date": "2020-06-19T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 18917,
                    "perc": 0.412147903762956
                  },
                  {
                    "": 490,
                    "date": "2020-06-20T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 15927,
                    "perc": 0.347004264060506
                  },
                  {
                    "": 491,
                    "date": "2020-06-21T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 16747,
                    "perc": 0.364869743845124
                  },
                  {
                    "": 492,
                    "date": "2020-06-22T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 18396,
                    "perc": 0.400796787948582
                  },
                  {
                    "": 493,
                    "date": "2020-06-23T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 18666,
                    "perc": 0.406679323975225
                  },
                  {
                    "": 494,
                    "date": "2020-06-24T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 19430,
                    "perc": 0.423324722213577
                  },
                  {
                    "": 495,
                    "date": "2020-06-25T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 20123,
                    "perc": 0.438423231348626
                  },
                  {
                    "": 496,
                    "date": "2020-06-26T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 20558,
                    "perc": 0.447900650502661
                  },
                  {
                    "": 497,
                    "date": "2020-06-27T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 17107,
                    "perc": 0.372713125213981
                  },
                  {
                    "": 498,
                    "date": "2020-06-28T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 17394,
                    "perc": 0.378966043138598
                  },
                  {
                    "": 499,
                    "date": "2020-06-29T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 18877,
                    "perc": 0.411276416944194
                  },
                  {
                    "": 500,
                    "date": "2020-06-30T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 19111,
                    "perc": 0.416374614833951
                  },
                  {
                    "": 501,
                    "date": "2020-07-01T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 21547,
                    "perc": 0.469448162096548
                  },
                  {
                    "": 502,
                    "date": "2020-07-02T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 23029,
                    "perc": 0.501736748731675
                  },
                  {
                    "": 503,
                    "date": "2020-07-03T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 23815,
                    "perc": 0.518861464720346
                  },
                  {
                    "": 504,
                    "date": "2020-07-04T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 18845,
                    "perc": 0.410579227489184
                  },
                  {
                    "": 505,
                    "date": "2020-07-05T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 20655,
                    "perc": 0.450014006038159
                  },
                  {
                    "": 506,
                    "date": "2020-07-06T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 22530,
                    "perc": 0.490864950667621
                  },
                  {
                    "": 507,
                    "date": "2020-07-07T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 23029,
                    "perc": 0.501736748731675
                  },
                  {
                    "": 508,
                    "date": "2020-07-08T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 24041,
                    "perc": 0.523785365246351
                  },
                  {
                    "": 509,
                    "date": "2020-07-09T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 25332,
                    "perc": 0.55191260232189
                  },
                  {
                    "": 510,
                    "date": "2020-07-10T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 25980,
                    "perc": 0.566030688785832
                  },
                  {
                    "": 511,
                    "date": "2020-07-11T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 22995,
                    "perc": 0.500995984935728
                  },
                  {
                    "": 512,
                    "date": "2020-07-12T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 23332,
                    "perc": 0.508338261383797
                  },
                  {
                    "": 513,
                    "date": "2020-07-13T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 24122,
                    "perc": 0.525550126054343
                  },
                  {
                    "": 514,
                    "date": "2020-07-14T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 24029,
                    "perc": 0.523523919200722
                  },
                  {
                    "": 515,
                    "date": "2020-07-15T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 25281,
                    "perc": 0.550801456627969
                  },
                  {
                    "": 516,
                    "date": "2020-07-16T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 26397,
                    "perc": 0.575115938871425
                  },
                  {
                    "": 517,
                    "date": "2020-07-17T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 27256,
                    "perc": 0.593831118304336
                  },
                  {
                    "": 518,
                    "date": "2020-07-18T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 24518,
                    "perc": 0.534177845560086
                  },
                  {
                    "": 519,
                    "date": "2020-07-19T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 23251,
                    "perc": 0.506573500575804
                  },
                  {
                    "": 520,
                    "date": "2020-07-20T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 24575,
                    "perc": 0.535419714276822
                  },
                  {
                    "": 521,
                    "date": "2020-07-21T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 24492,
                    "perc": 0.533611379127891
                  },
                  {
                    "": 522,
                    "date": "2020-07-22T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 24413,
                    "perc": 0.531890192660836
                  },
                  {
                    "": 523,
                    "date": "2020-07-23T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 25187,
                    "perc": 0.548753462603878
                  },
                  {
                    "": 524,
                    "date": "2020-07-24T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 27024,
                    "perc": 0.588776494755517
                  },
                  {
                    "": 525,
                    "date": "2020-07-25T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 24519,
                    "perc": 0.534199632730555
                  },
                  {
                    "": 526,
                    "date": "2020-07-26T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 24530,
                    "perc": 0.534439291605714
                  },
                  {
                    "": 527,
                    "date": "2020-07-27T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 24743,
                    "perc": 0.539079958915621
                  },
                  {
                    "": 528,
                    "date": "2020-07-28T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 24469,
                    "perc": 0.533110274207103
                  },
                  {
                    "": 529,
                    "date": "2020-07-29T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 24987,
                    "perc": 0.544396028510069
                  },
                  {
                    "": 530,
                    "date": "2020-07-30T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 20637,
                    "perc": 0.449621836969716
                  },
                  {
                    "": 531,
                    "date": "2020-07-31T00:00:00.000Z",
                    "destination_type": "large_airport",
                    "count": 26787,
                    "perc": 0.583612935354353
                  },
                  {
                    "": 532,
                    "date": "2020-01-01T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7556,
                    "perc": 0.868719717500205
                  },
                  {
                    "": 533,
                    "date": "2020-01-02T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9216,
                    "perc": 1.05957132298596
                  },
                  {
                    "": 534,
                    "date": "2020-01-03T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9016,
                    "perc": 1.03657715365032
                  },
                  {
                    "": 535,
                    "date": "2020-01-04T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8291,
                    "perc": 0.953223289808656
                  },
                  {
                    "": 536,
                    "date": "2020-01-05T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8792,
                    "perc": 1.01082368399442
                  },
                  {
                    "": 537,
                    "date": "2020-01-06T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8885,
                    "perc": 1.02151597273549
                  },
                  {
                    "": 538,
                    "date": "2020-01-07T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9129,
                    "perc": 1.04956885932496
                  },
                  {
                    "": 539,
                    "date": "2020-01-08T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9157,
                    "perc": 1.05278804303195
                  },
                  {
                    "": 540,
                    "date": "2020-01-09T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9573,
                    "perc": 1.10061591525006
                  },
                  {
                    "": 541,
                    "date": "2020-01-10T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9300,
                    "perc": 1.06922887410692
                  },
                  {
                    "": 542,
                    "date": "2020-01-11T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7599,
                    "perc": 0.873663463907366
                  },
                  {
                    "": 543,
                    "date": "2020-01-12T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7845,
                    "perc": 0.901946292190195
                  },
                  {
                    "": 544,
                    "date": "2020-01-13T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8722,
                    "perc": 1.00277572472694
                  },
                  {
                    "": 545,
                    "date": "2020-01-14T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9042,
                    "perc": 1.03956639566396
                  },
                  {
                    "": 546,
                    "date": "2020-01-15T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10646,
                    "perc": 1.22397963373573
                  },
                  {
                    "": 547,
                    "date": "2020-01-16T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10332,
                    "perc": 1.18787878787879
                  },
                  {
                    "": 548,
                    "date": "2020-01-17T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10641,
                    "perc": 1.22340477950234
                  },
                  {
                    "": 549,
                    "date": "2020-01-18T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7116,
                    "perc": 0.818132544961813
                  },
                  {
                    "": 550,
                    "date": "2020-01-19T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8567,
                    "perc": 0.984955243491829
                  },
                  {
                    "": 551,
                    "date": "2020-01-20T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10109,
                    "perc": 1.16224028906956
                  },
                  {
                    "": 552,
                    "date": "2020-01-21T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10915,
                    "perc": 1.25490679149216
                  },
                  {
                    "": 553,
                    "date": "2020-01-22T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10264,
                    "perc": 1.18006077030467
                  },
                  {
                    "": 554,
                    "date": "2020-01-23T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10943,
                    "perc": 1.25812597519915
                  },
                  {
                    "": 555,
                    "date": "2020-01-24T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10780,
                    "perc": 1.23938572719061
                  },
                  {
                    "": 556,
                    "date": "2020-01-25T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7880,
                    "perc": 0.90597027182393
                  },
                  {
                    "": 557,
                    "date": "2020-01-26T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8677,
                    "perc": 0.997602036626427
                  },
                  {
                    "": 558,
                    "date": "2020-01-27T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9576,
                    "perc": 1.1009608277901
                  },
                  {
                    "": 559,
                    "date": "2020-01-28T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9871,
                    "perc": 1.13487722756015
                  },
                  {
                    "": 560,
                    "date": "2020-01-29T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10741,
                    "perc": 1.23490186417016
                  },
                  {
                    "": 561,
                    "date": "2020-01-30T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10870,
                    "perc": 1.24973310339164
                  },
                  {
                    "": 562,
                    "date": "2020-01-31T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10589,
                    "perc": 1.21742629547508
                  },
                  {
                    "": 563,
                    "date": "2020-02-01T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8033,
                    "perc": 0.923560811365689
                  },
                  {
                    "": 564,
                    "date": "2020-02-02T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8449,
                    "perc": 0.971388683583805
                  },
                  {
                    "": 565,
                    "date": "2020-02-03T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10243,
                    "perc": 1.17764638252443
                  },
                  {
                    "": 566,
                    "date": "2020-02-04T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9742,
                    "perc": 1.12004598833867
                  },
                  {
                    "": 567,
                    "date": "2020-02-05T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10364,
                    "perc": 1.19155785497249
                  },
                  {
                    "": 568,
                    "date": "2020-02-06T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9903,
                    "perc": 1.13855629465386
                  },
                  {
                    "": 569,
                    "date": "2020-02-07T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10405,
                    "perc": 1.19627165968629
                  },
                  {
                    "": 570,
                    "date": "2020-02-08T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9743,
                    "perc": 1.12016095918535
                  },
                  {
                    "": 571,
                    "date": "2020-02-09T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8123,
                    "perc": 0.933908187566724
                  },
                  {
                    "": 572,
                    "date": "2020-02-10T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8516,
                    "perc": 0.979091730311243
                  },
                  {
                    "": 573,
                    "date": "2020-02-11T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9415,
                    "perc": 1.08245052147491
                  },
                  {
                    "": 574,
                    "date": "2020-02-12T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 11630,
                    "perc": 1.33711094686704
                  },
                  {
                    "": 575,
                    "date": "2020-02-13T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10779,
                    "perc": 1.23927075634393
                  },
                  {
                    "": 576,
                    "date": "2020-02-14T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 12537,
                    "perc": 1.44138950480414
                  },
                  {
                    "": 577,
                    "date": "2020-02-15T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10156,
                    "perc": 1.16764391886343
                  },
                  {
                    "": 578,
                    "date": "2020-02-16T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9318,
                    "perc": 1.07129834934713
                  },
                  {
                    "": 579,
                    "date": "2020-02-17T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 11404,
                    "perc": 1.31112753551778
                  },
                  {
                    "": 580,
                    "date": "2020-02-18T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10735,
                    "perc": 1.23421203909009
                  },
                  {
                    "": 581,
                    "date": "2020-02-19T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 11547,
                    "perc": 1.32756836659276
                  },
                  {
                    "": 582,
                    "date": "2020-02-20T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 11882,
                    "perc": 1.36608360022994
                  },
                  {
                    "": 583,
                    "date": "2020-02-21T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 12579,
                    "perc": 1.44621828036462
                  },
                  {
                    "": 584,
                    "date": "2020-02-22T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10935,
                    "perc": 1.25720620842572
                  },
                  {
                    "": 585,
                    "date": "2020-02-23T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10301,
                    "perc": 1.18431469163176
                  },
                  {
                    "": 586,
                    "date": "2020-02-24T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 11230,
                    "perc": 1.29112260819578
                  },
                  {
                    "": 587,
                    "date": "2020-02-25T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10094,
                    "perc": 1.16051572636938
                  },
                  {
                    "": 588,
                    "date": "2020-02-26T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10084,
                    "perc": 1.1593660179026
                  },
                  {
                    "": 589,
                    "date": "2020-02-27T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 11233,
                    "perc": 1.29146752073581
                  },
                  {
                    "": 590,
                    "date": "2020-02-28T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 12252,
                    "perc": 1.40862281350086
                  },
                  {
                    "": 591,
                    "date": "2020-02-29T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10355,
                    "perc": 1.19052311735239
                  },
                  {
                    "": 592,
                    "date": "2020-03-01T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9881,
                    "perc": 1.13602693602694
                  },
                  {
                    "": 593,
                    "date": "2020-03-02T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10122,
                    "perc": 1.16373491007637
                  },
                  {
                    "": 594,
                    "date": "2020-03-03T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10741,
                    "perc": 1.23490186417016
                  },
                  {
                    "": 595,
                    "date": "2020-03-04T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 11433,
                    "perc": 1.31446169007145
                  },
                  {
                    "": 596,
                    "date": "2020-03-05T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 11939,
                    "perc": 1.3726369384906
                  },
                  {
                    "": 597,
                    "date": "2020-03-06T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 11810,
                    "perc": 1.35780569926911
                  },
                  {
                    "": 598,
                    "date": "2020-03-07T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9228,
                    "perc": 1.0609509731461
                  },
                  {
                    "": 599,
                    "date": "2020-03-08T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10612,
                    "perc": 1.22007062494867
                  },
                  {
                    "": 600,
                    "date": "2020-03-09T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 11167,
                    "perc": 1.28387944485505
                  },
                  {
                    "": 601,
                    "date": "2020-03-10T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10335,
                    "perc": 1.18822370041882
                  },
                  {
                    "": 602,
                    "date": "2020-03-11T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10948,
                    "perc": 1.25870082943254
                  },
                  {
                    "": 603,
                    "date": "2020-03-12T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 11150,
                    "perc": 1.28192494046153
                  },
                  {
                    "": 604,
                    "date": "2020-03-13T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10675,
                    "perc": 1.2273137882894
                  },
                  {
                    "": 605,
                    "date": "2020-03-14T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8535,
                    "perc": 0.981276176398128
                  },
                  {
                    "": 606,
                    "date": "2020-03-15T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9073,
                    "perc": 1.04313049191098
                  },
                  {
                    "": 607,
                    "date": "2020-03-16T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9331,
                    "perc": 1.07279297035395
                  },
                  {
                    "": 608,
                    "date": "2020-03-17T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9046,
                    "perc": 1.04002627905067
                  },
                  {
                    "": 609,
                    "date": "2020-03-18T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8784,
                    "perc": 1.00990391722099
                  },
                  {
                    "": 610,
                    "date": "2020-03-19T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7517,
                    "perc": 0.864235854479757
                  },
                  {
                    "": 611,
                    "date": "2020-03-20T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7334,
                    "perc": 0.843196189537653
                  },
                  {
                    "": 612,
                    "date": "2020-03-21T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6882,
                    "perc": 0.791229366839123
                  },
                  {
                    "": 613,
                    "date": "2020-03-22T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5525,
                    "perc": 0.635213927896855
                  },
                  {
                    "": 614,
                    "date": "2020-03-23T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4834,
                    "perc": 0.555769072842244
                  },
                  {
                    "": 615,
                    "date": "2020-03-24T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5172,
                    "perc": 0.594629219019463
                  },
                  {
                    "": 616,
                    "date": "2020-03-25T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5354,
                    "perc": 0.615553913114889
                  },
                  {
                    "": 617,
                    "date": "2020-03-26T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5866,
                    "perc": 0.674418986614109
                  },
                  {
                    "": 618,
                    "date": "2020-03-27T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5298,
                    "perc": 0.609115545700912
                  },
                  {
                    "": 619,
                    "date": "2020-03-28T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 3803,
                    "perc": 0.437234129917057
                  },
                  {
                    "": 620,
                    "date": "2020-03-29T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 3221,
                    "perc": 0.370321097150365
                  },
                  {
                    "": 621,
                    "date": "2020-03-30T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4046,
                    "perc": 0.465172045659851
                  },
                  {
                    "": 622,
                    "date": "2020-03-31T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4441,
                    "perc": 0.510585530097725
                  },
                  {
                    "": 623,
                    "date": "2020-04-01T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4777,
                    "perc": 0.549215734581588
                  },
                  {
                    "": 624,
                    "date": "2020-04-02T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4195,
                    "perc": 0.482302701814897
                  },
                  {
                    "": 625,
                    "date": "2020-04-03T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4280,
                    "perc": 0.492075223782541
                  },
                  {
                    "": 626,
                    "date": "2020-04-04T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 3471,
                    "perc": 0.399063808819906
                  },
                  {
                    "": 627,
                    "date": "2020-04-05T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 3008,
                    "perc": 0.345832306807917
                  },
                  {
                    "": 628,
                    "date": "2020-04-06T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 3667,
                    "perc": 0.421598094768826
                  },
                  {
                    "": 629,
                    "date": "2020-04-07T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4192,
                    "perc": 0.481957789274862
                  },
                  {
                    "": 630,
                    "date": "2020-04-08T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4209,
                    "perc": 0.483912293668391
                  },
                  {
                    "": 631,
                    "date": "2020-04-09T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 3805,
                    "perc": 0.437464071610413
                  },
                  {
                    "": 632,
                    "date": "2020-04-10T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 3402,
                    "perc": 0.391130820399113
                  },
                  {
                    "": 633,
                    "date": "2020-04-11T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 3572,
                    "perc": 0.410675864334401
                  },
                  {
                    "": 634,
                    "date": "2020-04-12T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 2326,
                    "perc": 0.267422189373409
                  },
                  {
                    "": 635,
                    "date": "2020-04-13T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 2705,
                    "perc": 0.310996140264433
                  },
                  {
                    "": 636,
                    "date": "2020-04-14T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4385,
                    "perc": 0.504147162683748
                  },
                  {
                    "": 637,
                    "date": "2020-04-15T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4720,
                    "perc": 0.542662396320933
                  },
                  {
                    "": 638,
                    "date": "2020-04-16T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4527,
                    "perc": 0.520473022912047
                  },
                  {
                    "": 639,
                    "date": "2020-04-17T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4160,
                    "perc": 0.478278722181161
                  },
                  {
                    "": 640,
                    "date": "2020-04-18T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 3168,
                    "perc": 0.364227642276423
                  },
                  {
                    "": 641,
                    "date": "2020-04-19T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 3234,
                    "perc": 0.371815718157182
                  },
                  {
                    "": 642,
                    "date": "2020-04-20T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 3956,
                    "perc": 0.454824669458816
                  },
                  {
                    "": 643,
                    "date": "2020-04-21T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4647,
                    "perc": 0.534269524513427
                  },
                  {
                    "": 644,
                    "date": "2020-04-22T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4927,
                    "perc": 0.566461361583313
                  },
                  {
                    "": 645,
                    "date": "2020-04-23T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4752,
                    "perc": 0.546341463414634
                  },
                  {
                    "": 646,
                    "date": "2020-04-24T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4539,
                    "perc": 0.521852673072185
                  },
                  {
                    "": 647,
                    "date": "2020-04-25T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4481,
                    "perc": 0.515184363964852
                  },
                  {
                    "": 648,
                    "date": "2020-04-26T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 3470,
                    "perc": 0.398948837973228
                  },
                  {
                    "": 649,
                    "date": "2020-04-27T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4577,
                    "perc": 0.526221565245955
                  },
                  {
                    "": 650,
                    "date": "2020-04-28T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5291,
                    "perc": 0.608310749774164
                  },
                  {
                    "": 651,
                    "date": "2020-04-29T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4864,
                    "perc": 0.559218198242588
                  },
                  {
                    "": 652,
                    "date": "2020-04-30T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4773,
                    "perc": 0.548755851194876
                  },
                  {
                    "": 653,
                    "date": "2020-05-01T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5177,
                    "perc": 0.595204073252854
                  },
                  {
                    "": 654,
                    "date": "2020-05-02T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4693,
                    "perc": 0.539558183460622
                  },
                  {
                    "": 655,
                    "date": "2020-05-03T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4238,
                    "perc": 0.487246448222058
                  },
                  {
                    "": 656,
                    "date": "2020-05-04T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4730,
                    "perc": 0.543812104787715
                  },
                  {
                    "": 657,
                    "date": "2020-05-05T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5659,
                    "perc": 0.650620021351729
                  },
                  {
                    "": 658,
                    "date": "2020-05-06T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5735,
                    "perc": 0.659357805699269
                  },
                  {
                    "": 659,
                    "date": "2020-05-07T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6443,
                    "perc": 0.740757165147409
                  },
                  {
                    "": 660,
                    "date": "2020-05-08T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5815,
                    "perc": 0.668555473433522
                  },
                  {
                    "": 661,
                    "date": "2020-05-09T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4814,
                    "perc": 0.55346965590868
                  },
                  {
                    "": 662,
                    "date": "2020-05-10T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 3971,
                    "perc": 0.456549232158988
                  },
                  {
                    "": 663,
                    "date": "2020-05-11T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5064,
                    "perc": 0.582212367578221
                  },
                  {
                    "": 664,
                    "date": "2020-05-12T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5825,
                    "perc": 0.669705181900304
                  },
                  {
                    "": 665,
                    "date": "2020-05-13T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6622,
                    "perc": 0.7613369467028
                  },
                  {
                    "": 666,
                    "date": "2020-05-14T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6555,
                    "perc": 0.753633899975363
                  },
                  {
                    "": 667,
                    "date": "2020-05-15T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6605,
                    "perc": 0.759382442309272
                  },
                  {
                    "": 668,
                    "date": "2020-05-16T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5829,
                    "perc": 0.670165065287016
                  },
                  {
                    "": 669,
                    "date": "2020-05-17T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5054,
                    "perc": 0.58106265911144
                  },
                  {
                    "": 670,
                    "date": "2020-05-18T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5311,
                    "perc": 0.610610166707728
                  },
                  {
                    "": 671,
                    "date": "2020-05-19T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6046,
                    "perc": 0.695113739016178
                  },
                  {
                    "": 672,
                    "date": "2020-05-20T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7215,
                    "perc": 0.829514658782951
                  },
                  {
                    "": 673,
                    "date": "2020-05-21T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7563,
                    "perc": 0.869524513426952
                  },
                  {
                    "": 674,
                    "date": "2020-05-22T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6955,
                    "perc": 0.799622238646629
                  },
                  {
                    "": 675,
                    "date": "2020-05-23T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5287,
                    "perc": 0.607850866387452
                  },
                  {
                    "": 676,
                    "date": "2020-05-24T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 4626,
                    "perc": 0.531855136733186
                  },
                  {
                    "": 677,
                    "date": "2020-05-25T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5492,
                    "perc": 0.631419889956475
                  },
                  {
                    "": 678,
                    "date": "2020-05-26T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6688,
                    "perc": 0.768925022583559
                  },
                  {
                    "": 679,
                    "date": "2020-05-27T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7448,
                    "perc": 0.856302866058964
                  },
                  {
                    "": 680,
                    "date": "2020-05-28T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6994,
                    "perc": 0.804106101667077
                  },
                  {
                    "": 681,
                    "date": "2020-05-29T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7227,
                    "perc": 0.830894308943089
                  },
                  {
                    "": 682,
                    "date": "2020-05-30T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6257,
                    "perc": 0.719372587665271
                  },
                  {
                    "": 683,
                    "date": "2020-05-31T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6111,
                    "perc": 0.702586844050259
                  },
                  {
                    "": 684,
                    "date": "2020-06-01T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7445,
                    "perc": 0.855957953518929
                  },
                  {
                    "": 685,
                    "date": "2020-06-02T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7974,
                    "perc": 0.916777531411678
                  },
                  {
                    "": 686,
                    "date": "2020-06-03T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7781,
                    "perc": 0.894588158002792
                  },
                  {
                    "": 687,
                    "date": "2020-06-04T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7880,
                    "perc": 0.90597027182393
                  },
                  {
                    "": 688,
                    "date": "2020-06-05T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7616,
                    "perc": 0.875617968300895
                  },
                  {
                    "": 689,
                    "date": "2020-06-06T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5752,
                    "perc": 0.661312310092798
                  },
                  {
                    "": 690,
                    "date": "2020-06-07T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 5789,
                    "perc": 0.66556623141989
                  },
                  {
                    "": 691,
                    "date": "2020-06-08T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7137,
                    "perc": 0.820546932742055
                  },
                  {
                    "": 692,
                    "date": "2020-06-09T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7707,
                    "perc": 0.886080315348608
                  },
                  {
                    "": 693,
                    "date": "2020-06-10T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8012,
                    "perc": 0.921146423585448
                  },
                  {
                    "": 694,
                    "date": "2020-06-11T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8398,
                    "perc": 0.965525170403219
                  },
                  {
                    "": 695,
                    "date": "2020-06-12T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8875,
                    "perc": 1.0203662642687
                  },
                  {
                    "": 696,
                    "date": "2020-06-13T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7146,
                    "perc": 0.821581670362158
                  },
                  {
                    "": 697,
                    "date": "2020-06-14T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6319,
                    "perc": 0.726500780159317
                  },
                  {
                    "": 698,
                    "date": "2020-06-15T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8301,
                    "perc": 0.954372998275437
                  },
                  {
                    "": 699,
                    "date": "2020-06-16T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8654,
                    "perc": 0.994957707152829
                  },
                  {
                    "": 700,
                    "date": "2020-06-17T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8892,
                    "perc": 1.02232076866223
                  },
                  {
                    "": 701,
                    "date": "2020-06-18T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8907,
                    "perc": 1.0240453313624
                  },
                  {
                    "": 702,
                    "date": "2020-06-19T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9265,
                    "perc": 1.06520489447319
                  },
                  {
                    "": 703,
                    "date": "2020-06-20T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7723,
                    "perc": 0.887919848895459
                  },
                  {
                    "": 704,
                    "date": "2020-06-21T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6551,
                    "perc": 0.753174016588651
                  },
                  {
                    "": 705,
                    "date": "2020-06-22T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8400,
                    "perc": 0.965755112096575
                  },
                  {
                    "": 706,
                    "date": "2020-06-23T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9006,
                    "perc": 1.03542744518354
                  },
                  {
                    "": 707,
                    "date": "2020-06-24T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9634,
                    "perc": 1.10762913689743
                  },
                  {
                    "": 708,
                    "date": "2020-06-25T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10145,
                    "perc": 1.16637923954997
                  },
                  {
                    "": 709,
                    "date": "2020-06-26T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10034,
                    "perc": 1.15361747556869
                  },
                  {
                    "": 710,
                    "date": "2020-06-27T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7535,
                    "perc": 0.866305329719964
                  },
                  {
                    "": 711,
                    "date": "2020-06-28T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6569,
                    "perc": 0.755243491828858
                  },
                  {
                    "": 712,
                    "date": "2020-06-29T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7888,
                    "perc": 0.906890038597356
                  },
                  {
                    "": 713,
                    "date": "2020-06-30T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8891,
                    "perc": 1.02220579781555
                  },
                  {
                    "": 714,
                    "date": "2020-07-01T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9275,
                    "perc": 1.06635460293997
                  },
                  {
                    "": 715,
                    "date": "2020-07-02T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9888,
                    "perc": 1.13683173195368
                  },
                  {
                    "": 716,
                    "date": "2020-07-03T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9191,
                    "perc": 1.056697051819
                  },
                  {
                    "": 717,
                    "date": "2020-07-04T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 6459,
                    "perc": 0.74259669869426
                  },
                  {
                    "": 718,
                    "date": "2020-07-05T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 7727,
                    "perc": 0.888379732282171
                  },
                  {
                    "": 719,
                    "date": "2020-07-06T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8628,
                    "perc": 0.991968465139197
                  },
                  {
                    "": 720,
                    "date": "2020-07-07T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8775,
                    "perc": 1.00886917960089
                  },
                  {
                    "": 721,
                    "date": "2020-07-08T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9164,
                    "perc": 1.05359283895869
                  },
                  {
                    "": 722,
                    "date": "2020-07-09T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9774,
                    "perc": 1.12372505543237
                  },
                  {
                    "": 723,
                    "date": "2020-07-10T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9376,
                    "perc": 1.07796665845446
                  },
                  {
                    "": 724,
                    "date": "2020-07-11T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8335,
                    "perc": 0.958282007062495
                  },
                  {
                    "": 725,
                    "date": "2020-07-12T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8416,
                    "perc": 0.967594645643426
                  },
                  {
                    "": 726,
                    "date": "2020-07-13T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9202,
                    "perc": 1.05796173113246
                  },
                  {
                    "": 727,
                    "date": "2020-07-14T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9746,
                    "perc": 1.12050587172538
                  },
                  {
                    "": 728,
                    "date": "2020-07-15T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9833,
                    "perc": 1.13050833538638
                  },
                  {
                    "": 729,
                    "date": "2020-07-16T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9906,
                    "perc": 1.13890120719389
                  },
                  {
                    "": 730,
                    "date": "2020-07-17T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10456,
                    "perc": 1.20213517286688
                  },
                  {
                    "": 731,
                    "date": "2020-07-18T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9160,
                    "perc": 1.05313295557198
                  },
                  {
                    "": 732,
                    "date": "2020-07-19T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8164,
                    "perc": 0.938621992280529
                  },
                  {
                    "": 733,
                    "date": "2020-07-20T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9750,
                    "perc": 1.1209657551121
                  },
                  {
                    "": 734,
                    "date": "2020-07-21T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9944,
                    "perc": 1.14327009936766
                  },
                  {
                    "": 735,
                    "date": "2020-07-22T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10085,
                    "perc": 1.15948098874928
                  },
                  {
                    "": 736,
                    "date": "2020-07-23T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9577,
                    "perc": 1.10107579863677
                  },
                  {
                    "": 737,
                    "date": "2020-07-24T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10443,
                    "perc": 1.20064055186006
                  },
                  {
                    "": 738,
                    "date": "2020-07-25T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9710,
                    "perc": 1.11636692124497
                  },
                  {
                    "": 739,
                    "date": "2020-07-26T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8833,
                    "perc": 1.01553748870822
                  },
                  {
                    "": 740,
                    "date": "2020-07-27T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9054,
                    "perc": 1.04094604582409
                  },
                  {
                    "": 741,
                    "date": "2020-07-28T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 9533,
                    "perc": 1.09601708138294
                  },
                  {
                    "": 742,
                    "date": "2020-07-29T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10370,
                    "perc": 1.19224768005256
                  },
                  {
                    "": 743,
                    "date": "2020-07-30T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 8726,
                    "perc": 1.00323560811366
                  },
                  {
                    "": 744,
                    "date": "2020-07-31T00:00:00.000Z",
                    "destination_type": "medium_airport",
                    "count": 10730,
                    "perc": 1.2336371848567
                  },
                  {
                    "": 745,
                    "date": "2020-01-01T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 10928,
                    "perc": 0.783545704101282
                  },
                  {
                    "": 746,
                    "date": "2020-01-02T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13816,
                    "perc": 0.990617445814725
                  },
                  {
                    "": 747,
                    "date": "2020-01-03T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13547,
                    "perc": 0.971329946326873
                  },
                  {
                    "": 748,
                    "date": "2020-01-04T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14232,
                    "perc": 1.02044495431638
                  },
                  {
                    "": 749,
                    "date": "2020-01-05T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15022,
                    "perc": 1.0770885401729
                  },
                  {
                    "": 750,
                    "date": "2020-01-06T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14888,
                    "perc": 1.06748064079977
                  },
                  {
                    "": 751,
                    "date": "2020-01-07T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15195,
                    "perc": 1.08949276846806
                  },
                  {
                    "": 752,
                    "date": "2020-01-08T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14953,
                    "perc": 1.07214118900315
                  },
                  {
                    "": 753,
                    "date": "2020-01-09T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15076,
                    "perc": 1.08096038021879
                  },
                  {
                    "": 754,
                    "date": "2020-01-10T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14251,
                    "perc": 1.0218072684066
                  },
                  {
                    "": 755,
                    "date": "2020-01-11T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 11861,
                    "perc": 0.850442496005244
                  },
                  {
                    "": 756,
                    "date": "2020-01-12T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 12821,
                    "perc": 0.919275207932151
                  },
                  {
                    "": 757,
                    "date": "2020-01-13T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 12676,
                    "perc": 0.908878600401524
                  },
                  {
                    "": 758,
                    "date": "2020-01-14T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13256,
                    "perc": 0.95046503052403
                  },
                  {
                    "": 759,
                    "date": "2020-01-15T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15659,
                    "perc": 1.12276191256607
                  },
                  {
                    "": 760,
                    "date": "2020-01-16T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14735,
                    "perc": 1.05651042733642
                  },
                  {
                    "": 761,
                    "date": "2020-01-17T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15837,
                    "perc": 1.13552464456918
                  },
                  {
                    "": 762,
                    "date": "2020-01-18T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 11334,
                    "perc": 0.812656205187037
                  },
                  {
                    "": 763,
                    "date": "2020-01-19T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13303,
                    "perc": 0.953834965378785
                  },
                  {
                    "": 764,
                    "date": "2020-01-20T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 17179,
                    "perc": 1.23174703978367
                  },
                  {
                    "": 765,
                    "date": "2020-01-21T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15884,
                    "perc": 1.13889457942394
                  },
                  {
                    "": 766,
                    "date": "2020-01-22T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14571,
                    "perc": 1.04475150571557
                  },
                  {
                    "": 767,
                    "date": "2020-01-23T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15788,
                    "perc": 1.13201130823125
                  },
                  {
                    "": 768,
                    "date": "2020-01-24T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16881,
                    "perc": 1.21038021878969
                  },
                  {
                    "": 769,
                    "date": "2020-01-25T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13569,
                    "perc": 0.972907362641865
                  },
                  {
                    "": 770,
                    "date": "2020-01-26T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13442,
                    "perc": 0.963801368459868
                  },
                  {
                    "": 771,
                    "date": "2020-01-27T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13393,
                    "perc": 0.960288032121932
                  },
                  {
                    "": 772,
                    "date": "2020-01-28T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14061,
                    "perc": 1.0081841275044
                  },
                  {
                    "": 773,
                    "date": "2020-01-29T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15435,
                    "perc": 1.10670094644979
                  },
                  {
                    "": 774,
                    "date": "2020-01-30T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15373,
                    "perc": 1.10225550047118
                  },
                  {
                    "": 775,
                    "date": "2020-01-31T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15332,
                    "perc": 1.09931577006596
                  },
                  {
                    "": 776,
                    "date": "2020-02-01T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14329,
                    "perc": 1.02739992625067
                  },
                  {
                    "": 777,
                    "date": "2020-02-02T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14879,
                    "perc": 1.06683533412546
                  },
                  {
                    "": 778,
                    "date": "2020-02-03T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14975,
                    "perc": 1.07371860531815
                  },
                  {
                    "": 779,
                    "date": "2020-02-04T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13777,
                    "perc": 0.987821116892695
                  },
                  {
                    "": 780,
                    "date": "2020-02-05T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14389,
                    "perc": 1.0317019707461
                  },
                  {
                    "": 781,
                    "date": "2020-02-06T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14431,
                    "perc": 1.0347134018929
                  },
                  {
                    "": 782,
                    "date": "2020-02-07T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16343,
                    "perc": 1.17180521981399
                  },
                  {
                    "": 783,
                    "date": "2020-02-08T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 18389,
                    "perc": 1.31850493710821
                  },
                  {
                    "": 784,
                    "date": "2020-02-09T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 12803,
                    "perc": 0.917984594583521
                  },
                  {
                    "": 785,
                    "date": "2020-02-10T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 12343,
                    "perc": 0.885002253451879
                  },
                  {
                    "": 786,
                    "date": "2020-02-11T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 12692,
                    "perc": 0.910025812266973
                  },
                  {
                    "": 787,
                    "date": "2020-02-12T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15811,
                    "perc": 1.13366042528783
                  },
                  {
                    "": 788,
                    "date": "2020-02-13T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15279,
                    "perc": 1.09551563076167
                  },
                  {
                    "": 789,
                    "date": "2020-02-14T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 18667,
                    "perc": 1.33843774327037
                  },
                  {
                    "": 790,
                    "date": "2020-02-15T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 18917,
                    "perc": 1.35636292866801
                  },
                  {
                    "": 791,
                    "date": "2020-02-16T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16776,
                    "perc": 1.20285164092269
                  },
                  {
                    "": 792,
                    "date": "2020-02-17T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 17251,
                    "perc": 1.23690949317819
                  },
                  {
                    "": 793,
                    "date": "2020-02-18T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15914,
                    "perc": 1.14104560167165
                  },
                  {
                    "": 794,
                    "date": "2020-02-19T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 18285,
                    "perc": 1.31104805998279
                  },
                  {
                    "": 795,
                    "date": "2020-02-20T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 17694,
                    "perc": 1.26867292170279
                  },
                  {
                    "": 796,
                    "date": "2020-02-21T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 20620,
                    "perc": 1.47846929159667
                  },
                  {
                    "": 797,
                    "date": "2020-02-22T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 19490,
                    "perc": 1.39744745359938
                  },
                  {
                    "": 798,
                    "date": "2020-02-23T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16969,
                    "perc": 1.21668988404966
                  },
                  {
                    "": 799,
                    "date": "2020-02-24T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15501,
                    "perc": 1.11143319539476
                  },
                  {
                    "": 800,
                    "date": "2020-02-25T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14998,
                    "perc": 1.07536772237473
                  },
                  {
                    "": 801,
                    "date": "2020-02-26T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14331,
                    "perc": 1.02754332773385
                  },
                  {
                    "": 802,
                    "date": "2020-02-27T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 17024,
                    "perc": 1.22063342483714
                  },
                  {
                    "": 803,
                    "date": "2020-02-28T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 18314,
                    "perc": 1.31312738148892
                  },
                  {
                    "": 804,
                    "date": "2020-02-29T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 18397,
                    "perc": 1.31907854304093
                  },
                  {
                    "": 805,
                    "date": "2020-03-01T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15326,
                    "perc": 1.09888556561642
                  },
                  {
                    "": 806,
                    "date": "2020-03-02T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13477,
                    "perc": 0.966310894415537
                  },
                  {
                    "": 807,
                    "date": "2020-03-03T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14882,
                    "perc": 1.06705043635023
                  },
                  {
                    "": 808,
                    "date": "2020-03-04T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16456,
                    "perc": 1.17990740361372
                  },
                  {
                    "": 809,
                    "date": "2020-03-05T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 18679,
                    "perc": 1.33929815216946
                  },
                  {
                    "": 810,
                    "date": "2020-03-06T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 17706,
                    "perc": 1.26953333060188
                  },
                  {
                    "": 811,
                    "date": "2020-03-07T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16533,
                    "perc": 1.18542836071619
                  },
                  {
                    "": 812,
                    "date": "2020-03-08T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16654,
                    "perc": 1.19410415044864
                  },
                  {
                    "": 813,
                    "date": "2020-03-09T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15381,
                    "perc": 1.1028291064039
                  },
                  {
                    "": 814,
                    "date": "2020-03-10T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15393,
                    "perc": 1.10368951530299
                  },
                  {
                    "": 815,
                    "date": "2020-03-11T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15462,
                    "perc": 1.10863686647273
                  },
                  {
                    "": 816,
                    "date": "2020-03-12T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16007,
                    "perc": 1.14771377063957
                  },
                  {
                    "": 817,
                    "date": "2020-03-13T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14482,
                    "perc": 1.03837013971402
                  },
                  {
                    "": 818,
                    "date": "2020-03-14T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14948,
                    "perc": 1.0717826852952
                  },
                  {
                    "": 819,
                    "date": "2020-03-15T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14146,
                    "perc": 1.0142786905396
                  },
                  {
                    "": 820,
                    "date": "2020-03-16T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14470,
                    "perc": 1.03750973081493
                  },
                  {
                    "": 821,
                    "date": "2020-03-17T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13786,
                    "perc": 0.988466423567009
                  },
                  {
                    "": 822,
                    "date": "2020-03-18T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13248,
                    "perc": 0.949891424591306
                  },
                  {
                    "": 823,
                    "date": "2020-03-19T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 10938,
                    "perc": 0.784262711517188
                  },
                  {
                    "": 824,
                    "date": "2020-03-20T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 11558,
                    "perc": 0.828717171303315
                  },
                  {
                    "": 825,
                    "date": "2020-03-21T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13209,
                    "perc": 0.947095095669275
                  },
                  {
                    "": 826,
                    "date": "2020-03-22T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 10753,
                    "perc": 0.77099807432294
                  },
                  {
                    "": 827,
                    "date": "2020-03-23T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 7719,
                    "perc": 0.55345802433728
                  },
                  {
                    "": 828,
                    "date": "2020-03-24T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9379,
                    "perc": 0.672481255377556
                  },
                  {
                    "": 829,
                    "date": "2020-03-25T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9863,
                    "perc": 0.707184414307371
                  },
                  {
                    "": 830,
                    "date": "2020-03-26T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 10378,
                    "perc": 0.744110296226492
                  },
                  {
                    "": 831,
                    "date": "2020-03-27T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9339,
                    "perc": 0.669613225713935
                  },
                  {
                    "": 832,
                    "date": "2020-03-28T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 7653,
                    "perc": 0.548725775392305
                  },
                  {
                    "": 833,
                    "date": "2020-03-29T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 7072,
                    "perc": 0.507067644528209
                  },
                  {
                    "": 834,
                    "date": "2020-03-30T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 7745,
                    "perc": 0.555322243618634
                  },
                  {
                    "": 835,
                    "date": "2020-03-31T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 8491,
                    "perc": 0.608810996845167
                  },
                  {
                    "": 836,
                    "date": "2020-04-01T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9507,
                    "perc": 0.681658950301143
                  },
                  {
                    "": 837,
                    "date": "2020-04-02T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 8380,
                    "perc": 0.600852214528619
                  },
                  {
                    "": 838,
                    "date": "2020-04-03T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 7960,
                    "perc": 0.570737903060597
                  },
                  {
                    "": 839,
                    "date": "2020-04-04T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 7878,
                    "perc": 0.564858442250174
                  },
                  {
                    "": 840,
                    "date": "2020-04-05T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 6807,
                    "perc": 0.488066948006719
                  },
                  {
                    "": 841,
                    "date": "2020-04-06T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 6907,
                    "perc": 0.495237022165772
                  },
                  {
                    "": 842,
                    "date": "2020-04-07T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 7852,
                    "perc": 0.56299422296882
                  },
                  {
                    "": 843,
                    "date": "2020-04-08T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 8330,
                    "perc": 0.597267177449092
                  },
                  {
                    "": 844,
                    "date": "2020-04-09T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 7000,
                    "perc": 0.501905191133691
                  },
                  {
                    "": 845,
                    "date": "2020-04-10T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 8250,
                    "perc": 0.59153111812185
                  },
                  {
                    "": 846,
                    "date": "2020-04-11T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 8651,
                    "perc": 0.620283115499652
                  },
                  {
                    "": 847,
                    "date": "2020-04-12T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 4796,
                    "perc": 0.343876756668169
                  },
                  {
                    "": 848,
                    "date": "2020-04-13T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 5581,
                    "perc": 0.400161838816733
                  },
                  {
                    "": 849,
                    "date": "2020-04-14T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9052,
                    "perc": 0.649035112877453
                  },
                  {
                    "": 850,
                    "date": "2020-04-15T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9628,
                    "perc": 0.690334740033597
                  },
                  {
                    "": 851,
                    "date": "2020-04-16T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9428,
                    "perc": 0.675994591715491
                  },
                  {
                    "": 852,
                    "date": "2020-04-17T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 8420,
                    "perc": 0.60372024419224
                  },
                  {
                    "": 853,
                    "date": "2020-04-18T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 7331,
                    "perc": 0.525638136600156
                  },
                  {
                    "": 854,
                    "date": "2020-04-19T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 7827,
                    "perc": 0.561201704429057
                  },
                  {
                    "": 855,
                    "date": "2020-04-20T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 7900,
                    "perc": 0.566435858565166
                  },
                  {
                    "": 856,
                    "date": "2020-04-21T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9036,
                    "perc": 0.647887901012005
                  },
                  {
                    "": 857,
                    "date": "2020-04-22T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9532,
                    "perc": 0.683451468840906
                  },
                  {
                    "": 858,
                    "date": "2020-04-23T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 8917,
                    "perc": 0.639355512762732
                  },
                  {
                    "": 859,
                    "date": "2020-04-24T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 8733,
                    "perc": 0.626162576310075
                  },
                  {
                    "": 860,
                    "date": "2020-04-25T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 10332,
                    "perc": 0.740812062113328
                  },
                  {
                    "": 861,
                    "date": "2020-04-26T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9219,
                    "perc": 0.661009136723071
                  },
                  {
                    "": 862,
                    "date": "2020-04-27T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 8982,
                    "perc": 0.644016060966116
                  },
                  {
                    "": 863,
                    "date": "2020-04-28T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 10210,
                    "perc": 0.732064571639284
                  },
                  {
                    "": 864,
                    "date": "2020-04-29T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 8369,
                    "perc": 0.600063506371123
                  },
                  {
                    "": 865,
                    "date": "2020-04-30T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9142,
                    "perc": 0.655488179620601
                  },
                  {
                    "": 866,
                    "date": "2020-05-01T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 11450,
                    "perc": 0.820973491211538
                  },
                  {
                    "": 867,
                    "date": "2020-05-02T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 11750,
                    "perc": 0.842483713688696
                  },
                  {
                    "": 868,
                    "date": "2020-05-03T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 10096,
                    "perc": 0.723890687097964
                  },
                  {
                    "": 869,
                    "date": "2020-05-04T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9934,
                    "perc": 0.712275166960298
                  },
                  {
                    "": 870,
                    "date": "2020-05-05T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 10363,
                    "perc": 0.743034785102634
                  },
                  {
                    "": 871,
                    "date": "2020-05-06T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 11300,
                    "perc": 0.810218379972959
                  },
                  {
                    "": 872,
                    "date": "2020-05-07T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 12734,
                    "perc": 0.913037243413775
                  },
                  {
                    "": 873,
                    "date": "2020-05-08T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 11025,
                    "perc": 0.790500676035564
                  },
                  {
                    "": 874,
                    "date": "2020-05-09T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 11978,
                    "perc": 0.858831482771336
                  },
                  {
                    "": 875,
                    "date": "2020-05-10T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 8066,
                    "perc": 0.578338181669193
                  },
                  {
                    "": 876,
                    "date": "2020-05-11T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9612,
                    "perc": 0.689187528168148
                  },
                  {
                    "": 877,
                    "date": "2020-05-12T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 10456,
                    "perc": 0.749702954070554
                  },
                  {
                    "": 878,
                    "date": "2020-05-13T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 12063,
                    "perc": 0.864926045806531
                  },
                  {
                    "": 879,
                    "date": "2020-05-14T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 11507,
                    "perc": 0.825060433482198
                  },
                  {
                    "": 880,
                    "date": "2020-05-15T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 12350,
                    "perc": 0.885504158643012
                  },
                  {
                    "": 881,
                    "date": "2020-05-16T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13354,
                    "perc": 0.957491703199902
                  },
                  {
                    "": 882,
                    "date": "2020-05-17T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 10890,
                    "perc": 0.780821075920842
                  },
                  {
                    "": 883,
                    "date": "2020-05-18T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9408,
                    "perc": 0.674560576883681
                  },
                  {
                    "": 884,
                    "date": "2020-05-19T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 10909,
                    "perc": 0.782183390011062
                  },
                  {
                    "": 885,
                    "date": "2020-05-20T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13097,
                    "perc": 0.939064612611136
                  },
                  {
                    "": 886,
                    "date": "2020-05-21T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15152,
                    "perc": 1.08640963657967
                  },
                  {
                    "": 887,
                    "date": "2020-05-22T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13726,
                    "perc": 0.984164379071578
                  },
                  {
                    "": 888,
                    "date": "2020-05-23T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 12234,
                    "perc": 0.877186872618511
                  },
                  {
                    "": 889,
                    "date": "2020-05-24T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 10121,
                    "perc": 0.725683205637727
                  },
                  {
                    "": 890,
                    "date": "2020-05-25T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 9700,
                    "perc": 0.695497193428115
                  },
                  {
                    "": 891,
                    "date": "2020-05-26T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 11560,
                    "perc": 0.828860572786496
                  },
                  {
                    "": 892,
                    "date": "2020-05-27T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13075,
                    "perc": 0.937487196296145
                  },
                  {
                    "": 893,
                    "date": "2020-05-28T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 11775,
                    "perc": 0.844276232228459
                  },
                  {
                    "": 894,
                    "date": "2020-05-29T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13696,
                    "perc": 0.982013356823862
                  },
                  {
                    "": 895,
                    "date": "2020-05-30T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15368,
                    "perc": 1.10189699676322
                  },
                  {
                    "": 896,
                    "date": "2020-05-31T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14631,
                    "perc": 1.049053550211
                  },
                  {
                    "": 897,
                    "date": "2020-06-01T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14417,
                    "perc": 1.03370959151063
                  },
                  {
                    "": 898,
                    "date": "2020-06-02T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14549,
                    "perc": 1.04317408940058
                  },
                  {
                    "": 899,
                    "date": "2020-06-03T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14192,
                    "perc": 1.01757692465276
                  },
                  {
                    "": 900,
                    "date": "2020-06-04T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14521,
                    "perc": 1.04116646863605
                  },
                  {
                    "": 901,
                    "date": "2020-06-05T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13697,
                    "perc": 0.982085057565453
                  },
                  {
                    "": 902,
                    "date": "2020-06-06T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 12630,
                    "perc": 0.90558036628836
                  },
                  {
                    "": 903,
                    "date": "2020-06-07T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13172,
                    "perc": 0.944442168230426
                  },
                  {
                    "": 904,
                    "date": "2020-06-08T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13816,
                    "perc": 0.990617445814725
                  },
                  {
                    "": 905,
                    "date": "2020-06-09T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13170,
                    "perc": 0.944298766747245
                  },
                  {
                    "": 906,
                    "date": "2020-06-10T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13449,
                    "perc": 0.964303273651002
                  },
                  {
                    "": 907,
                    "date": "2020-06-11T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16096,
                    "perc": 1.15409513664113
                  },
                  {
                    "": 908,
                    "date": "2020-06-12T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 19315,
                    "perc": 1.38489982382103
                  },
                  {
                    "": 909,
                    "date": "2020-06-13T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 17152,
                    "perc": 1.22981111976072
                  },
                  {
                    "": 910,
                    "date": "2020-06-14T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15361,
                    "perc": 1.10139509157209
                  },
                  {
                    "": 911,
                    "date": "2020-06-15T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14668,
                    "perc": 1.05170647764985
                  },
                  {
                    "": 912,
                    "date": "2020-06-16T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15247,
                    "perc": 1.09322120703077
                  },
                  {
                    "": 913,
                    "date": "2020-06-17T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16230,
                    "perc": 1.16370303601426
                  },
                  {
                    "": 914,
                    "date": "2020-06-18T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16273,
                    "perc": 1.16678616790265
                  },
                  {
                    "": 915,
                    "date": "2020-06-19T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16597,
                    "perc": 1.19001720817798
                  },
                  {
                    "": 916,
                    "date": "2020-06-20T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15325,
                    "perc": 1.09881386487483
                  },
                  {
                    "": 917,
                    "date": "2020-06-21T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13979,
                    "perc": 1.00230466669398
                  },
                  {
                    "": 918,
                    "date": "2020-06-22T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14547,
                    "perc": 1.0430306879174
                  },
                  {
                    "": 919,
                    "date": "2020-06-23T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14782,
                    "perc": 1.05988036219117
                  },
                  {
                    "": 920,
                    "date": "2020-06-24T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 17457,
                    "perc": 1.25167984594584
                  },
                  {
                    "": 921,
                    "date": "2020-06-25T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 18061,
                    "perc": 1.29498709386651
                  },
                  {
                    "": 922,
                    "date": "2020-06-26T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 18214,
                    "perc": 1.30595730732986
                  },
                  {
                    "": 923,
                    "date": "2020-06-27T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15231,
                    "perc": 1.09207399516532
                  },
                  {
                    "": 924,
                    "date": "2020-06-28T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 12841,
                    "perc": 0.920709222763961
                  },
                  {
                    "": 925,
                    "date": "2020-06-29T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13053,
                    "perc": 0.935909779981153
                  },
                  {
                    "": 926,
                    "date": "2020-06-30T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14976,
                    "perc": 1.07379030605974
                  },
                  {
                    "": 927,
                    "date": "2020-07-01T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15558,
                    "perc": 1.11552013766542
                  },
                  {
                    "": 928,
                    "date": "2020-07-02T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 18006,
                    "perc": 1.29104355307903
                  },
                  {
                    "": 929,
                    "date": "2020-07-03T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 18368,
                    "perc": 1.31699922153481
                  },
                  {
                    "": 930,
                    "date": "2020-07-04T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 13748,
                    "perc": 0.985741795386569
                  },
                  {
                    "": 931,
                    "date": "2020-07-05T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14661,
                    "perc": 1.05120457245872
                  },
                  {
                    "": 932,
                    "date": "2020-07-06T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 14777,
                    "perc": 1.05952185848322
                  },
                  {
                    "": 933,
                    "date": "2020-07-07T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15010,
                    "perc": 1.07622813127381
                  },
                  {
                    "": 934,
                    "date": "2020-07-08T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15481,
                    "perc": 1.10999918056295
                  },
                  {
                    "": 935,
                    "date": "2020-07-09T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16575,
                    "perc": 1.18843979186299
                  },
                  {
                    "": 936,
                    "date": "2020-07-10T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16419,
                    "perc": 1.17725447617487
                  },
                  {
                    "": 937,
                    "date": "2020-07-11T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 17213,
                    "perc": 1.23418486499775
                  },
                  {
                    "": 938,
                    "date": "2020-07-12T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 17439,
                    "perc": 1.25038923259721
                  },
                  {
                    "": 939,
                    "date": "2020-07-13T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16949,
                    "perc": 1.21525586921785
                  },
                  {
                    "": 940,
                    "date": "2020-07-14T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 17667,
                    "perc": 1.26673700167985
                  },
                  {
                    "": 941,
                    "date": "2020-07-15T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 17397,
                    "perc": 1.2473778014504
                  },
                  {
                    "": 942,
                    "date": "2020-07-16T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 17924,
                    "perc": 1.28516409226861
                  },
                  {
                    "": 943,
                    "date": "2020-07-17T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 19198,
                    "perc": 1.37651083705494
                  },
                  {
                    "": 944,
                    "date": "2020-07-18T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 19283,
                    "perc": 1.38260540009014
                  },
                  {
                    "": 945,
                    "date": "2020-07-19T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16960,
                    "perc": 1.21604457737534
                  },
                  {
                    "": 946,
                    "date": "2020-07-20T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16838,
                    "perc": 1.2072970869013
                  },
                  {
                    "": 947,
                    "date": "2020-07-21T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16766,
                    "perc": 1.20213463350678
                  },
                  {
                    "": 948,
                    "date": "2020-07-22T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15858,
                    "perc": 1.13703036014258
                  },
                  {
                    "": 949,
                    "date": "2020-07-23T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16582,
                    "perc": 1.18894169705412
                  },
                  {
                    "": 950,
                    "date": "2020-07-24T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 18718,
                    "perc": 1.34209448109149
                  },
                  {
                    "": 951,
                    "date": "2020-07-25T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 19089,
                    "perc": 1.36869545622158
                  },
                  {
                    "": 952,
                    "date": "2020-07-26T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 17037,
                    "perc": 1.22156553447781
                  },
                  {
                    "": 953,
                    "date": "2020-07-27T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15564,
                    "perc": 1.11595034211497
                  },
                  {
                    "": 954,
                    "date": "2020-07-28T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 16605,
                    "perc": 1.19059081411071
                  },
                  {
                    "": 955,
                    "date": "2020-07-29T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 18466,
                    "perc": 1.32402589421068
                  },
                  {
                    "": 956,
                    "date": "2020-07-30T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 15074,
                    "perc": 1.08081697873561
                  },
                  {
                    "": 957,
                    "date": "2020-07-31T00:00:00.000Z",
                    "destination_type": "small_airport",
                    "count": 19681,
                    "perc": 1.41114229524317
                  }
                ]
              },
              "selection": {
                "Select": {
                  "type": "single",
                  "fields": [
                    "destination_type"
                  ],
                  "init": {
                    "destination_type": "large_airport"
                  },
                  "bind": {
                    "destination_type": {
                      "input": "select",
                      "options": [
                        "balloonport",
                        "heliport",
                        "large_airport",
                        "medium_airport",
                        "small_airport"
                      ]
                    }
                  }
                }
              },
              "encoding": {
                "x": {
                  "field": "date",
                  "type": "temporal"
                },
                "y": {
                  "field": "perc",
                  "type": "quantitative"
                },
                "color": {
                  "field": "destination_type",
                  "type": "nominal"
                },
                "tooltip": [
                  {
                    "field": "count",
                    "type": "nominal"
                  },
                  {
                    "field": "perc",
                    "type": "nominal"
                  },
                  {
                    "field": "destination_type",
                    "type": "nominal"
                  }
                ],
                "opacity": {
                  "condition": {
                    "test": {
                      "selection": "Select"
                    },
                    "value": 0.75
                  },
                  "value": 0.05
                }
              },
              "height": height-50,
              "width": width
            }
          ],
          "spacing": 5

    }
    embed(id, spec, {})

}