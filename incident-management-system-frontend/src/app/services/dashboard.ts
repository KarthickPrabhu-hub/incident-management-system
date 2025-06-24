import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface Incident {
  id: number;
  service: string;
  severity: 'Critical' | 'High' | 'Low';
  status: string;
  createdAt?: string;
  resolvedAt?: string;
}
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = `${environment.apiUrl}/incidents`;

  constructor(private http: HttpClient) {}

  getIncidentStats(): Observable<any> {
    const headers = new HttpHeaders({
      'x-api-key': environment.apiKey
    });

    return this.http.get<Incident[]>(this.apiUrl, { headers }).pipe(
      map((incidents) => {
        const total = incidents.length;
        const critical = incidents.filter(i => i.severity === 'Critical').length;
        const high = incidents.filter(i => i.severity === 'High').length;
        const low = incidents.filter(i => i.severity === 'Low').length;

        // MTTR Calculation
        const durations = incidents
          .filter(i => i.createdAt && i.resolvedAt)
          .map(i => {
            const start = new Date(i.createdAt!).getTime();
            const end = new Date(i.resolvedAt!).getTime();
            return (end - start) / 60000;
          });

        const avgMTTR = durations.length > 0
          ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
          : 0;

        // Trend Data (last 7 days)
        const countsByDay: { [key: string]: number } = {};
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(today.getDate() - i);
          const key = d.toISOString().split('T')[0];
          countsByDay[key] = 0;
        }

        incidents.forEach(i => {
          if (i.createdAt) {
            const key = new Date(i.createdAt).toISOString().split('T')[0];
            if (countsByDay[key] !== undefined) {
              countsByDay[key]++;
            }
          }
        });

        return {
          total,
          critical,
          high,
          low,
          avgMTTR,
          trendLabels: Object.keys(countsByDay),
          trendData: Object.values(countsByDay)
        };
      })
    );
  }
}
