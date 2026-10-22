import React from 'react';
import { AppConfig } from '../types';

interface ChannelsPageProps {
  config?: AppConfig;
}

export const ChannelsPage: React.FC<ChannelsPageProps> = React.memo(({ config }) => {
  const whatsappUrl = config?.whatsappChannelUrl || 'https://whatsapp.com/channel/0029VbBC1JjFcovyKOtAaI2z';
  const youtubeUrl = config?.youtubeChannelUrl || 'https://www.youtube.com/@SaralTalks';

  return (
    <div
      id="channels-page"
      className="max-w-2xl mx-auto space-y-5 sm:space-y-6 py-2 sm:py-4"
    >
      {/* Heading & Subtitle */}
      <div className="space-y-1 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-black text-[#081E23] tracking-tight">
          Our Channels
        </h1>
        <p className="text-xs sm:text-sm text-[#5C6E6A] font-medium leading-relaxed">
          Stay connected with ARSCA for tax updates and insights.
        </p>
      </div>

      {/* Two Channel Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {/* WhatsApp Channel Card */}
        <div
          id="card-whatsapp-channel"
          className="bg-white rounded-2xl border border-[#E2DDD2] p-5 sm:p-6 shadow-xs flex flex-col justify-between"
        >
          <div>
            {/* WhatsApp Icon */}
            <div className="w-12 h-12 rounded-xl bg-[#E8F8EE] flex items-center justify-center text-[#20BA68] mb-3.5">
              <svg
                className="w-6 h-6 text-[#20BA68] fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="WhatsApp"
              >
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.1 19.09L7.81 18.92L4.7 19.74L5.53 16.71L5.34 16.41C4.55 15.15 4.14 13.55 4.14 11.91C4.14 7.37 7.84 3.67 12.05 3.67M9.54 7.39C9.37 7.39 9.1 7.45 8.87 7.7C8.64 7.95 8 8.55 8 9.77C8 10.99 8.89 12.17 9.01 12.33C9.13 12.49 10.73 15.08 13.25 16.08C15.35 16.91 15.77 16.75 16.23 16.71C16.69 16.67 17.71 16.1 17.92 15.52C18.13 14.94 18.13 14.44 18.06 14.34C18 14.24 17.84 14.18 17.59 14.05C17.35 13.93 16.14 13.34 15.91 13.26C15.69 13.17 15.52 13.13 15.36 13.38C15.19 13.62 14.71 14.18 14.57 14.34C14.43 14.51 14.28 14.53 14.04 14.41C13.8 14.28 12.8 13.95 11.61 12.89C10.68 12.06 10.06 11.04 9.88 10.73C9.7 10.42 9.86 10.26 9.98 10.14C10.09 10.03 10.23 9.85 10.35 9.71C10.47 9.57 10.51 9.47 10.59 9.31C10.67 9.14 10.63 9 10.57 8.87C10.51 8.75 10.02 7.55 9.82 7.06C9.62 6.58 9.42 6.64 9.27 6.63C9.13 6.63 8.96 6.63 8.79 6.63L9.54 7.39Z" />
              </svg>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-[#081E23] tracking-tight mb-1">
              Our WhatsApp Channel
            </h2>

            <p className="text-xs sm:text-sm text-[#5C6E6A] font-normal leading-relaxed mb-5">
              Get the latest tax updates and important reminders.
            </p>
          </div>

          <a
            id="btn-follow-whatsapp-channel"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#20BA68] hover:bg-[#1DA85E] active:bg-[#189452] text-[#081E23] font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm text-center transition-colors cursor-pointer"
          >
            Follow Channel
          </a>
        </div>

        {/* YouTube Channel Card */}
        <div
          id="card-youtube-channel"
          className="bg-white rounded-2xl border border-[#E2DDD2] p-5 sm:p-6 shadow-xs flex flex-col justify-between"
        >
          <div>
            {/* YouTube Icon */}
            <div className="w-12 h-12 rounded-xl bg-[#FFECEC] flex items-center justify-center text-[#FF0000] mb-3.5">
              <svg
                className="w-6 h-6 text-[#FF0000] fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="YouTube"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-[#081E23] tracking-tight mb-1">
              Our YouTube Channel
            </h2>

            <p className="text-xs sm:text-sm text-[#5C6E6A] font-normal leading-relaxed mb-5">
              Watch our latest videos on tax and compliance.
            </p>
          </div>

          <a
            id="btn-visit-youtube-channel"
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#FF0000] hover:bg-[#E60000] active:bg-[#CC0000] text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm text-center transition-colors cursor-pointer"
          >
            Visit Channel
          </a>
        </div>
      </div>
    </div>
  );
});

ChannelsPage.displayName = 'ChannelsPage';
