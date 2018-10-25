import '@babel/polyfill';

import canvas from '@ahsdile/canvas-lms-app';
import enableCourseRecycleBinPlugin from '@ahsdile/canvas-lms-enable-course-recycle-bin-plugin';
import reorderDashboardCoursesPlugin from '@ahsdile/canvas-lms-reorder-dashboard-courses-plugin';
import '@ahsdile/canvas-lms-sticky-left-menu-plugin/index.css';


canvas.addPlugin(enableCourseRecycleBinPlugin);
canvas.addPlugin(reorderDashboardCoursesPlugin);

canvas.run();
