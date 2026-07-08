import { BetaAnalyticsDataClient } from '@google-analytics/data';

// These should be configured in your .env.local
const propertyId = process.env.GA_PROPERTY_ID;
const clientEmail = process.env.GA_CLIENT_EMAIL;
// Handle the private key properly (replace escaped newlines if passed in via env)
const privateKey = process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n');

// Initialize the client only if credentials exist
let analyticsDataClient: BetaAnalyticsDataClient | null = null;

if (propertyId && clientEmail && privateKey) {
  try {
    analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
    });
  } catch (error) {
    console.error("Failed to initialize Google Analytics Data Client:", error);
  }
}

export type AnalyticsReportData = {
  date: string;
  activeUsers: number;
  sessions: number;
  screenPageViews: number;
};

export async function getAnalyticsReport(days: number = 30): Promise<{ data: AnalyticsReportData[]; isConfigured: boolean }> {
  if (!analyticsDataClient || !propertyId) {
    return { data: [], isConfigured: false };
  }

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: `${days}daysAgo`,
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'date',
        },
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
        {
          name: 'sessions',
        },
        {
          name: 'screenPageViews',
        },
      ],
      orderBys: [
        {
          dimension: {
            dimensionName: 'date',
          },
          desc: false,
        },
      ],
    });

    const data: AnalyticsReportData[] = [];

    response.rows?.forEach((row) => {
      if (row.dimensionValues && row.metricValues) {
        // The date format is YYYYMMDD, we can parse it to make it readable
        const rawDate = row.dimensionValues[0].value || '';
        const formattedDate = rawDate.length === 8 
          ? `${rawDate.substring(0, 4)}-${rawDate.substring(4, 6)}-${rawDate.substring(6, 8)}`
          : rawDate;

        data.push({
          date: formattedDate,
          activeUsers: parseInt(row.metricValues[0].value || '0', 10),
          sessions: parseInt(row.metricValues[1].value || '0', 10),
          screenPageViews: parseInt(row.metricValues[2].value || '0', 10),
        });
      }
    });

    return { data, isConfigured: true };
  } catch (error) {
    console.error('Error fetching analytics report:', error);
    return { data: [], isConfigured: false }; // Treat as not configured/error
  }
}
