import type { Request, Response } from 'express';

const ASSET_LINKS = [
  {
    relation: [
      'delegate_permission/common.handle_all_urls',
    ],
    target: {
      namespace: 'android_app',
      package_name: 'in.arsca.taxconsultant',
      sha256_cert_fingerprints: [
        '69:F3:93:53:FD:34:D0:3F:F5:BE:6F:28:BF:9B:8A:B9:E9:F4:02:14:E9:5E:44:E6:B5:8A:9D:34:FF:2B:EA:B6',
      ],
    },
  },
];

export default function handler(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
  return res.status(200).send(JSON.stringify(ASSET_LINKS, null, 2));
}
