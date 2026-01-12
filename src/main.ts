import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  DoughnutController,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  BarController,
  DoughnutController,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
