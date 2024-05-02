const { gql } = require('graphql-request');

// GraphQL query to fetch all charge stations
const allChargeStationsQuery = gql`
  query GetChargeStations($limit: Int, $offset: Int) {
    publicChargeStation(limit: $limit, offset: $offset, orderBy: { createdAt: ASC }) {
      id
      name
      coordinates
      address
      city
      state
      postalCode
      operatingHours
      chargePoints {
        id
        chargePointConnectors {
          id
          chargePointId
          position
          connector
          maxPower
          available
          enumConnector {
            type
          }
          tariff {
            id
            priceKwh
            adminFee
            connectionFee
            currencyId
            pjnFee
            priceKwhOriginal
            connectionFeeOriginal
            discountPercentageKwh
            discountPercentageSurcharge
            discountPercentageAdminFee
            tax {
              id
              amount
            }
          }
        }
      }
      total: chargePointsAggregate(where: { isAvailable: { _eq: "Available" } }) {
        aggregate {
          count
        }
      }
    }
  }
`;

// GraphQL query to fetch charge station details by station ID
const chargeStationDetailsQuery = gql`
  query GetChargeStationDetails($stationId: bigint) {
    publicChargeStation(where: { id: { _eq: $stationId } }) {
      id
      name
      coordinates
      address
      city
      state
      postalCode
      operatingHours
      isAvailable
      type
      chargePoints(orderBy: { position: ASC }) {
        id
        isAvailable
        online
        chargePointConnectors(orderBy: { position: ASC }) {
          id
          chargePointId
          position
          connector
          maxPower
          available
          enumConnector {
            type
          }
          tariff {
            id
            priceKwh
            adminFee
            connectionFee
            currencyId
            pjnFee
            priceKwhOriginal
            connectionFeeOriginal
            discountPercentageKwh
            discountPercentageSurcharge
            discountPercentageAdminFee
            tax {
              id
              amount
            }
          }
        }
      }
      total: chargePointsAggregate {
        aggregate {
          count
        }
      }
      available: chargePointsAggregate(where: { isAvailable: { _eq: "Available" } }) {
        aggregate {
          count
        }
      }
    }
  }
`;

module.exports = { allChargeStationsQuery, chargeStationDetailsQuery };
