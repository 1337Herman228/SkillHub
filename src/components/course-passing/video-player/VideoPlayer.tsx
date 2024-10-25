"use client";

import { memo, useEffect, useRef, useState } from "react";
import "./VideoPlayer.scss";
import VolumeSlider from "./volume-slider/VolumeSlider";

interface VideoPlayerProps {
    videoSrc?: string;
}

const VideoPlayer = memo(
    ({
        videoSrc = "/upload-videos/X2Download.com-Hollywood Undead - Bullet (Lyric Video).mp4",
    }: VideoPlayerProps) => {
        const timeLineRef = useRef<HTMLDivElement>(null);
        const videoContainerRef = useRef<HTMLDivElement>(null);
        const videoRef = useRef<HTMLVideoElement>(null);
        const currentTimeRef = useRef<HTMLDivElement>(null);
        const totalTimeRef = useRef<HTMLDivElement>(null);

        const [isScrubbing, setIsScrubbing] = useState(false);
        const [playbackSpeed, setPlaybackSpeed] = useState(1);
        const [isPaused, setIsPaused] = useState(false);
        const [isFullScreen, setIsFullScreen] = useState(false);
        const [volume, setVolume] = useState(0.5);
        const [isVolumeSliderOpen, setIsVolumeSliderOpen] =
            useState<boolean>(false);

        const handleTimelineUpdate = (e: any) => {
            const rect = timeLineRef.current?.getBoundingClientRect();
            const percent =
                Math.min(Math.max(0, e.x - rect!.x), rect!.width) / rect!.width;

            if (isScrubbing) {
                e.preventDefault();
                timeLineRef.current?.style.setProperty(
                    "--progress-position",
                    String(percent)
                );
            }
        };

        const toggleScrubbing = (e: any) => {
            const rect = timeLineRef.current?.getBoundingClientRect();
            const percent =
                Math.min(Math.max(0, e.x - rect!.x), rect!.width) / rect!.width;
            setIsScrubbing((e.button & 1) === 1);
            if (isScrubbing) {
                videoRef.current?.pause();
            } else {
                videoRef.current!.currentTime =
                    percent * videoRef.current!.duration;
                if (isPaused) videoRef.current?.play();
            }
            handleTimelineUpdate(e);
        };

        const handleMouseEnter = () => {
            setIsVolumeSliderOpen(true); // Открываем слайдер при наведении
        };

        const handleMouseLeave = () => {
            setIsVolumeSliderOpen(false); // Закрываем слайдер при уходе мыши
        };

        const changlePlaybackSpeed = () => {
            if (videoRef.current) {
                let newSpeed = playbackSpeed + 0.25;
                if (playbackSpeed >= 2) newSpeed = 0.5;
                setPlaybackSpeed(newSpeed);
                videoRef.current.playbackRate = newSpeed;
            }
        };

        const togglePlay = () => {
            if (videoRef.current) {
                videoRef.current.paused
                    ? videoRef.current.play()
                    : videoRef.current.pause();
                videoRef.current.paused
                    ? setIsPaused(false)
                    : setIsPaused(true);
            }
        };

        const toggleMute = () => {
            if (videoRef.current) {
                volume > 0
                    ? (videoRef.current.muted = true)
                    : (videoRef.current.muted = false);
                videoRef.current.muted ? setVolume(0) : setVolume(0.5);
            }
        };

        const toggleFullScreenMode = () => {
            if (
                document.fullscreenElement == null &&
                videoContainerRef.current
            ) {
                videoContainerRef.current.requestFullscreen();
                setIsFullScreen(true);
            } else {
                document.exitFullscreen();
                setIsFullScreen(false);
            }
        };

        const keyboardManage = (e: KeyboardEvent) => {
            switch (e.key.toLowerCase()) {
                case " ":
                    togglePlay();
                    break;
                case "k":
                    togglePlay();
                    break;
                case "f":
                    toggleFullScreenMode();
                    break;
                case "m":
                    toggleMute();
                    break;
                case "arrowleft":
                case "j":
                    skip(-5);
                    break;
                case "arrowright":
                case "l":
                    skip(5);
                    break;
            }
        };

        const skip = (duration: number) => {
            if (videoRef.current) videoRef.current.currentTime += duration;
        };

        useEffect(() => {
            //Для горячих клавиш
            document.addEventListener("keydown", keyboardManage);
            //Для остановки/запуска по клику
            videoRef.current?.addEventListener("click", togglePlay);

            timeLineRef.current?.addEventListener("mousedown", toggleScrubbing);

            if (totalTimeRef.current) {
                insertTotalDuration();
                videoRef.current?.addEventListener(
                    "loadeddata",
                    insertTotalDuration
                );
            }

            videoRef.current?.addEventListener("timeupdate", insertCurrentTime);

            return () => {
                //Убираем слушатели
                timeLineRef.current?.removeEventListener(
                    "mousedown",
                    toggleScrubbing
                );

                document.removeEventListener("keydown", keyboardManage);
                videoRef.current?.removeEventListener("click", togglePlay);
                videoRef.current?.removeEventListener(
                    "loadeddata",
                    insertTotalDuration
                );
                videoRef.current?.removeEventListener(
                    "timeupdate",
                    insertCurrentTime
                );
            };
        }, []);

        const insertCurrentTime = () => {
            const currentTime = formatDuration(videoRef.current?.currentTime);
            if (currentTime && currentTimeRef.current)
                currentTimeRef.current.innerText = currentTime;
            if (videoRef.current?.currentTime) {
                const percent =
                    videoRef.current?.currentTime / videoRef.current?.duration;
                timeLineRef.current?.style.setProperty(
                    "--progress-position",
                    String(percent)
                );
            }
        };

        const insertTotalDuration = () => {
            const totalDuration = formatDuration(videoRef.current?.duration);
            if (totalDuration && totalTimeRef.current)
                totalTimeRef.current.innerText = totalDuration;
        };

        const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
            minimumIntegerDigits: 2,
        });
        const formatDuration = (time: any) => {
            const seconds = Math.floor(time % 60);
            const minutes = Math.floor(time / 60) % 60;
            const hours = Math.floor(time / 3600);
            if (hours === 0) {
                return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
            } else {
                return `${hours}:${leadingZeroFormatter.format(
                    minutes
                )}:${leadingZeroFormatter.format(seconds)}`;
            }
        };

        useEffect(() => {
            if (videoRef.current) {
                videoRef.current.volume = volume;
            }
        }, [volume]);

        return (
            <div ref={videoContainerRef} className="video-container ">
                <div className="video-controls-container ">
                    <div ref={timeLineRef} className="timeline-container">
                        <div className="timeline"></div>
                    </div>
                    <div className="controls">
                        <button onClick={togglePlay} className="play-paus-btn">
                            {isPaused ? (
                                <svg
                                    width="21"
                                    height="21"
                                    viewBox="0 0 23 26"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0 26H7.66667V0H0V26ZM15.3333 0V26H23V0H15.3333Z"
                                        fill="white"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    width="21"
                                    height="21"
                                    viewBox="0 0 25 33"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0 32.6667L25.2083 16.3333L0 0V32.6667Z"
                                        fill="white"
                                    />
                                </svg>
                            )}
                        </button>
                        <button onClick={() => skip(-5)}>
                            <svg
                                width="23"
                                height="23"
                                viewBox="0 0 29 36"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M14.3333 7.16667V0L5.375 8.95833L14.3333 17.9167V10.75C20.2637 10.75 25.0833 15.5696 25.0833 21.5C25.0833 27.4304 20.2637 32.25 14.3333 32.25C8.40292 32.25 3.58333 27.4304 3.58333 21.5H0C0 29.4192 6.41417 35.8333 14.3333 35.8333C22.2525 35.8333 28.6667 29.4192 28.6667 21.5C28.6667 13.5808 22.2525 7.16667 14.3333 7.16667Z"
                                    fill="white"
                                />
                            </svg>
                        </button>
                        <button
                            onClick={changlePlaybackSpeed}
                            className="speed-btn wide"
                        >
                            {playbackSpeed}x
                        </button>
                        <button onClick={() => skip(5)}>
                            <svg
                                width="23"
                                height="23"
                                viewBox="0 0 29 36"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M14.3334 7.16667V0L23.2917 8.95833L14.3334 17.9167V10.75C8.403 10.75 3.58342 15.5696 3.58342 21.5C3.58342 27.4304 8.403 32.25 14.3334 32.25C20.2638 32.25 25.0834 27.4304 25.0834 21.5H28.6667C28.6667 29.4192 22.2526 35.8333 14.3334 35.8333C6.41425 35.8333 8.39233e-05 29.4192 8.39233e-05 21.5C8.39233e-05 13.5808 6.41425 7.16667 14.3334 7.16667Z"
                                    fill="white"
                                />
                            </svg>
                        </button>

                        <div className="duration-container">
                            <div ref={currentTimeRef} className="current-time">
                                0:00
                            </div>
                            /
                            <div ref={totalTimeRef} className="total-time">
                                10:00
                            </div>
                        </div>
                        <div
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className="volume-container"
                        >
                            <div
                                className={`volume-bar ${
                                    isVolumeSliderOpen ? "open" : ""
                                }`}
                            >
                                <VolumeSlider
                                    fillLevel={volume}
                                    onChange={setVolume}
                                />
                            </div>

                            <button onClick={toggleMute} className="mute-btn">
                                {volume > 0 ? (
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 33 33"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M0 10.5783V21.5783H7.33333L16.5 30.745V1.41167L7.33333 10.5783H0ZM24.75 16.0783C24.75 12.8333 22.88 10.0467 20.1667 8.69V23.4483C22.88 22.11 24.75 19.3233 24.75 16.0783ZM20.1667 0V3.77667C25.465 5.35333 29.3333 10.2667 29.3333 16.0783C29.3333 21.89 25.465 26.8033 20.1667 28.38V32.1567C27.5183 30.4883 33 23.925 33 16.0783C33 8.23167 27.5183 1.66833 20.1667 0V0Z"
                                            fill="white"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        width="33"
                                        height="33"
                                        viewBox="0 0 33 33"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M24.75 16.5C24.75 13.255 22.88 10.4683 20.1667 9.11167V13.1633L24.6583 17.655C24.7133 17.2883 24.75 16.9033 24.75 16.5V16.5ZM29.3333 16.5C29.3333 18.2233 28.9667 19.8367 28.3433 21.34L31.1117 24.1083C32.3217 21.835 33 19.25 33 16.5C33 8.65333 27.5183 2.09 20.1667 0.421667V4.19833C25.465 5.775 29.3333 10.6883 29.3333 16.5ZM2.32833 0L0 2.32833L8.67167 11H0V22H7.33333L16.5 31.1667V18.8283L24.2917 26.62C23.0633 27.5733 21.6883 28.325 20.1667 28.7833V32.56C22.6967 31.9917 24.9883 30.8183 26.9317 29.2417L30.6717 33L33 30.6717L16.5 14.1717L2.32833 0ZM16.5 1.83333L12.6683 5.665L16.5 9.49667V1.83333Z"
                                            fill="white"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <button
                            onClick={toggleFullScreenMode}
                            className="full-screen-btn"
                        >
                            {isFullScreen ? (
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 28 28"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0 22H6V28H10V18H0V22ZM6 6H0V10H10V0H6V6ZM18 28H22V22H28V18H18V28ZM22 6V0H18V10H28V6H22Z"
                                        fill="white"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 28 28"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 18H0V28H10V24H4V18ZM0 10H4V4H10V0H0V10ZM24 24H18V28H28V18H24V24ZM18 0V4H24V10H28V0H18Z"
                                        fill="white"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
                <video ref={videoRef} src={videoSrc}></video>
            </div>
        );
    }
);

export default VideoPlayer;
