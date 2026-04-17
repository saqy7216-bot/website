<?php

namespace Database\Seeders;

use App\Models\CaseStudy;
use Illuminate\Database\Seeder;

class CaseStudySeeder extends Seeder
{
    public function run(): void
    {
        $cases = [
            [
                'title'               => 'Smart Grid Implementation for Northern Region',
                'title_kurdish'       => 'جێبەجێکردنی تۆڕی زیرەک بۆ ناوچەی باکوور',
                'category'            => 'Energy',
                'description'         => 'Deployed an AI-driven smart grid system across 12 substations, reducing energy loss by 34% and improving fault detection response time from 4 hours to under 8 minutes.',
                'description_kurdish' => 'سیستەمی تۆڕی زیرەکی AI-driven لە سەر ١٢ بەکارهێنەر جێبەجێکرا، کە کەمکردنەوەی وێنەی وزە بە ٣٤٪ و باشترکردنی کاتی وەڵامدانەوەی دۆزینەوەی هەڵە لە ٤ کاتژمێر بۆ کەمتر لە ٨ خولەک.',
                'tags'                => ['Smart Grid', 'AI', 'Energy', 'IoT'],
                'gradient'            => 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
                'link'                => 'https://rizon.tech/cases/smart-grid',
                'is_published'        => true,
                'sort_order'          => 1,
            ],
            [
                'title'               => 'Solar Farm Monitoring Dashboard',
                'title_kurdish'       => 'داشبۆردی چاودێریکردنی زەوییە خۆرەکە',
                'category'            => 'Renewable Energy',
                'description'         => 'Built a real-time monitoring platform for a 50MW solar farm, integrating weather forecasting APIs with production analytics to optimize output by 18%.',
                'description_kurdish' => 'پلاتفۆرمێکی چاودێریکردنی ئەمەزمان بۆ زەوییەکی خۆرەکەی ٥٠MW دروستکرا.',
                'tags'                => ['Solar', 'Dashboard', 'Real-time', 'Analytics'],
                'gradient'            => 'linear-gradient(135deg, #f7971e, #ffd200)',
                'link'                => 'https://rizon.tech/cases/solar-dashboard',
                'is_published'        => true,
                'sort_order'          => 2,
            ],
            [
                'title'               => 'Industrial Automation for Manufacturing Plant',
                'title_kurdish'       => 'ئۆتۆماسیۆنی پیشەسازی بۆ کارخانەی بەرهەمهێنان',
                'category'            => 'Automation',
                'description'         => 'Integrated PLC-based automation across 6 production lines, achieving a 27% increase in throughput and a 41% reduction in manual error rates.',
                'description_kurdish' => 'ئۆتۆماسیۆنی بنەڕەتی PLC لەسەر ٦ هێڵی بەرهەمهێنان یەکگرتکرا.',
                'tags'                => ['PLC', 'Automation', 'Manufacturing', 'SCADA'],
                'gradient'            => 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
                'link'                => 'https://rizon.tech/cases/industrial-automation',
                'is_published'        => true,
                'sort_order'          => 3,
            ],
            [
                'title'               => 'Water Treatment SCADA Upgrade',
                'title_kurdish'       => 'نوێکردنەوەی SCADA بۆ چارەسەرکردنی ئاو',
                'category'            => 'Infrastructure',
                'description'         => 'Modernised a legacy water treatment facility with a new SCADA system, enabling remote monitoring of 200+ sensors and cutting operational costs by 22%.',
                'description_kurdish' => 'نوێکردنەوەی بنکەی چارەسەرکردنی ئاوی کۆنەپەرست بە سیستەمی SCADA-ی نوێ.',
                'tags'                => ['SCADA', 'Water', 'Infrastructure', 'Remote Monitoring'],
                'gradient'            => 'linear-gradient(135deg, #0052d4, #4364f7, #6fb1fc)',
                'link'                => 'https://rizon.tech/cases/water-scada',
                'is_published'        => true,
                'sort_order'          => 4,
            ],
            [
                'title'               => 'EV Charging Network Deployment',
                'title_kurdish'       => 'جێبەجێکردنی تۆڕی شارژکردنی EV',
                'category'            => 'Electric Vehicles',
                'description'         => 'Designed and deployed a city-wide EV charging network of 80 stations with smart load balancing, payment integration, and a driver-facing mobile app.',
                'description_kurdish' => 'تۆڕی شارژکردنی EV-ی شارەکە بە ٨٠ وێستگە دیزاین و جێبەجێکرا.',
                'tags'                => ['EV', 'Charging', 'IoT', 'Mobile App'],
                'gradient'            => 'linear-gradient(135deg, #11998e, #38ef7d)',
                'link'                => 'https://rizon.tech/cases/ev-network',
                'is_published'        => true,
                'sort_order'          => 5,
            ],
            [
                'title'               => 'Building Energy Management System',
                'title_kurdish'       => 'سیستەمی بەڕێوەبردنی وزەی بینا',
                'category'            => 'Smart Buildings',
                'description'         => 'Deployed a BMS across a 32-floor commercial tower, integrating HVAC, lighting, and security systems to achieve a 29% reduction in total energy consumption.',
                'description_kurdish' => 'BMS لەسەر بەرجەستەی بازرگانی ٣٢ نهۆمی جێبەجێکرا.',
                'tags'                => ['BMS', 'HVAC', 'Smart Building', 'Energy Saving'],
                'gradient'            => 'linear-gradient(135deg, #4b6cb7, #182848)',
                'link'                => 'https://rizon.tech/cases/building-bms',
                'is_published'        => true,
                'sort_order'          => 6,
            ],
            [
                'title'               => 'Fiber Optic Network for Industrial Zone',
                'title_kurdish'       => 'تۆڕی فایبەر ئۆپتیک بۆ زۆنی پیشەسازی',
                'category'            => 'Networking',
                'description'         => 'Planned and deployed 120km of fiber optic infrastructure across an industrial zone, delivering sub-1ms latency for time-critical control systems.',
                'description_kurdish' => 'بنەڕەتی فایبەر ئۆپتیکی ١٢٠کم لەسەر زۆنی پیشەسازی پلان و جێبەجێکرا.',
                'tags'                => ['Fiber', 'Networking', 'Industrial', 'Low Latency'],
                'gradient'            => 'linear-gradient(135deg, #373b44, #4286f4)',
                'link'                => 'https://rizon.tech/cases/fiber-network',
                'is_published'        => true,
                'sort_order'          => 7,
            ],
            [
                'title'               => 'Predictive Maintenance Platform',
                'title_kurdish'       => 'پلاتفۆرمی چاکسازیی پێشبینیکراو',
                'category'            => 'AI & Analytics',
                'description'         => 'Built an ML-based predictive maintenance system for heavy machinery, reducing unplanned downtime by 63% and extending average equipment lifespan by 2.4 years.',
                'description_kurdish' => 'سیستەمی چاکسازیی پێشبینیکراوی بنەڕەتی ML بۆ ئامێرە قورسەکان دروستکرا.',
                'tags'                => ['ML', 'Predictive Maintenance', 'AI', 'Analytics'],
                'gradient'            => 'linear-gradient(135deg, #6a3093, #a044ff)',
                'link'                => 'https://rizon.tech/cases/predictive-maintenance',
                'is_published'        => true,
                'sort_order'          => 8,
            ],
            [
                'title'               => 'Airport Security & Surveillance Upgrade',
                'title_kurdish'       => 'نوێکردنەوەی ئەمنیەت و چاودێریی فڕۆکەخانە',
                'category'            => 'Security',
                'description'         => 'Overhauled the surveillance system of a regional airport with 340 IP cameras, AI-based facial recognition, and a centralised command dashboard.',
                'description_kurdish' => 'سیستەمی چاودێریی فڕۆکەخانەی ناوچەیەک بە ٣٤٠ کامێرای IP نوێکرایەوە.',
                'tags'                => ['Surveillance', 'AI', 'Security', 'IP Camera'],
                'gradient'            => 'linear-gradient(135deg, #232526, #414345)',
                'link'                => 'https://rizon.tech/cases/airport-security',
                'is_published'        => true,
                'sort_order'          => 9,
            ],
            [
                'title'               => 'Remote Substation Automation',
                'title_kurdish'       => 'ئۆتۆماسیۆنی وێستگەی دوورەکان',
                'category'            => 'Energy',
                'description'         => 'Automated 18 remote substations with RTU integration and satellite communication fallback, achieving 99.97% uptime over a 12-month period.',
                'description_kurdish' => '١٨ وێستگەی دوور بە یەکگرتنی RTU و پاڵپشتی پەیوەندیی سەتەلایت ئۆتۆمات کرا.',
                'tags'                => ['Substation', 'RTU', 'Automation', 'SCADA'],
                'gradient'            => 'linear-gradient(135deg, #c94b4b, #4b134f)',
                'link'                => 'https://rizon.tech/cases/substation-automation',
                'is_published'        => false,
                'sort_order'          => 10,
            ],
        ];

        foreach ($cases as $case) {
            CaseStudy::create($case);
        }
    }
}