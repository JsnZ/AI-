/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

export default function App() {
  // State variables replicating the exact logic of the vanilla HTML
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [userAgreement, setUserAgreement] = useState(false);

  // Verification code timer and testing mockup values
  const [countdown, setCountdown] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  // Modal display toggles
  const [isAgreementOpen, setIsAgreementOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // High contrast toast state
  const [toastMessage, setToastMessage] = useState('消息提示');
  const [toastIcon, setToastIcon] = useState('💡');
  const [isToastVisible, setIsToastVisible] = useState(false);

  // Timer runner for dynamic SMS countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown <= 0) {
      setTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, countdown]);

  // High contrast Toast feedback
  const showToast = (message: string, icon = '💡') => {
    setToastMessage(message);
    setToastIcon(icon);
    setIsToastVisible(true);
  };

  // Automatically dim toast message
  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (isToastVisible) {
      timeout = setTimeout(() => {
        setIsToastVisible(false);
      }, 3000);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isToastVisible]);

  // Smooth scroll helper to registration section
  const scrollToSignUp = () => {
    const element = document.getElementById('signup-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const phoneElem = document.getElementById('phoneNumber');
        if (phoneElem) {
          phoneElem.focus();
        }
      }, 800);
    }
  };

  // Replicating sendVerificationCode logic
  const handleSendCode = () => {
    const trimmedPhone = phoneNumber.trim();

    if (!/^1[3-9]\d{9}$/.test(trimmedPhone)) {
      showToast('请输入正确的11位手机号码', '❌');
      return;
    }

    if (timerRunning) return;

    // Simulate SMS verification receipt
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedCode(code);
    showToast(`【51CTO】验证码已发送: ${code} (请在验证码框内输入)`, '✅');

    setCountdown(60);
    setTimerRunning(true);
  };

  // Submit subscription signupForm
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedPhone = phoneNumber.trim();
    const trimmedCode = verifyCode.trim();

    if (!/^1[3-9]\d{9}$/.test(trimmedPhone)) {
      showToast('请输入正确的11位手机号码', '❌');
      return;
    }

    if (!/^\d{4,6}$/.test(trimmedCode)) {
      showToast('请输入正确的数字验证码', '❌');
      return;
    }

    if (generatedCode && trimmedCode !== generatedCode) {
      showToast('验证码不正确或未获取！', '❌');
      return;
    }

    if (!userAgreement) {
      showToast('请同意用户须知', '⚠️');
      return;
    }

    showToast('报名成功！', '🎉');

    // Reset simple form inputs
    setPhoneNumber('');
    setVerifyCode('');
    setUserAgreement(false);
    setTimerRunning(false);

    // Open Success Modal after mini delay
    setTimeout(() => {
      setIsSuccessOpen(true);
    }, 800);
  };

  return (
    <div className="min-h-screen flex justify-center items-start overflow-x-hidden antialiased bg-slate-200">
      
      {/* Main Container mimicking high-fidelity mobile view */}
      <div className="w-full max-w-md min-h-screen bg-white flex flex-col relative shadow-2xl overflow-hidden pb-24 border-x border-slate-200">
        
        {/* 2. Top Header Banner picture */}
        <header className="w-full bg-brand-dark relative">
          <img
            src="https://i.ibb.co/9mrTQrJ6/Chat-GPT-Image-2026-5-26-14-24-28.png"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80';
            }}
            alt="在职读硕指南官方高清头图"
            className="w-full h-auto block"
            referrerPolicy="no-referrer"
          />
        </header>

        {/* 3. Core Achievements Stats Line */}
        <section className="w-full bg-brand-red text-white py-7 px-6 shadow-md relative z-20">
          <div className="grid grid-cols-3 gap-2 text-center divide-x divide-white/20">
            <div className="flex flex-col justify-center">
              <span className="text-xs text-white/90 font-bold tracking-wider uppercase">Rankings</span>
              <span className="text-base font-black mt-1">美国顶级名校</span>
            </div>
            <div className="flex flex-col justify-center px-1">
              <span className="text-xs text-white/90 font-bold tracking-wider uppercase">Admissions</span>
              <span className="text-base font-black mt-1">免联考申请制</span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xs text-white/90 font-bold tracking-wider uppercase">academic year</span>
              <span className="text-base font-black mt-1">1年学制</span>
            </div>
          </div>
        </section>

        {/* 4. Core Value Highlight List */}
        <section className="px-6 py-8 bg-brand-bgLight">
          <div className="mb-6">
            <span className="text-xs font-bold text-brand-red tracking-widest uppercase block mb-1.5">
              01 / PROJECT VALUE
            </span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-6 bg-brand-red rounded-full"></span>
              <h2 className="text-xl font-black text-brand-dark tracking-tight">核心价值亮点区</h2>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {/* Card 1 */}
            <div className="bg-white border border-brand-border/40 rounded-2xl p-4 shadow-sm flex flex-col items-center text-center justify-start h-full hover:shadow-md transition duration-200">
              <div className="text-brand-red mb-3.5 flex items-center justify-center">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3z" />
                  <path d="M12 16.5c-2.49 0-5.16-1.12-6.5-2.5v4c1.34 1.38 4.01 2.5 6.5 2.5s5.16-1.12 6.5-2.5v-4c-1.34 1.38-4.01 2.5-6.5 2.5z" />
                </svg>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-brand-dark leading-snug">双名校项目详解</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  AI/计算机方向任选，适配不同职业路径
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-brand-border/40 rounded-2xl p-3.5 shadow-sm flex flex-col items-center text-center justify-start h-full hover:shadow-md transition duration-200">
              <div className="text-brand-red mb-3.5 flex items-center justify-center">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-brand-dark leading-snug">免联考申请通道</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  中文学习/灵活学制，不脱产拿硕士学位
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-brand-border/40 rounded-2xl p-3.5 shadow-sm flex flex-col items-center text-center justify-start h-full hover:shadow-md transition duration-200">
              <div className="text-brand-red mb-3.5 flex items-center justify-center">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-brand-dark leading-snug">行业导师背景评估</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  申请条件&流程全攻略，零门槛入门
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Safe Area / SignUp Area Section */}
        <section id="signup-section" className="px-6 py-8 bg-white">
          <div className="mb-6">
            <span className="text-xs font-bold text-brand-red tracking-widest uppercase block mb-1.5">
              02 / SECURE YOUR SPOT
            </span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-6 bg-brand-red rounded-full"></span>
              <h2 className="text-xl font-black text-brand-dark tracking-tight">报名区域</h2>
            </div>
          </div>

          <div className="bg-brand-bgLight border border-brand-border rounded-xl px-5 py-6 shadow-sm relative">
            {/* Countdown / Status Tag badge */}
            <div className="absolute -top-3 right-4 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded shadow">
              专项预定
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-5">
              {/* Phone text input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <input
                  type="tel"
                  id="phoneNumber"
                  placeholder="请输入手机号报名"
                  required
                  maxLength={11}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  className="w-full pl-11 pr-4 py-3.5 h-[54px] bg-white text-brand-dark placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 transition duration-200 text-sm font-semibold border border-brand-border"
                />
              </div>

              {/* Verify numerical SMS code */}
              <div className="flex gap-2.5">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="verifyCode"
                    placeholder="请输入验证码"
                    required
                    maxLength={6}
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-11 pr-4 py-3.5 h-[54px] bg-white text-brand-dark placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/30 transition duration-200 text-sm font-semibold border border-brand-border"
                  />
                </div>
                <button
                  type="button"
                  id="btnSendCode"
                  onClick={handleSendCode}
                  disabled={timerRunning}
                  className={`px-4 font-bold text-xs rounded-xl transition duration-150 whitespace-nowrap active:scale-95 flex items-center justify-center min-w-[100px] h-[54px] border border-brand-border ${
                    timerRunning
                      ? 'bg-slate-100 text-slate-400'
                      : 'bg-white text-brand-red hover:bg-slate-50'
                  }`}
                >
                  {timerRunning ? `${countdown}s` : '获取验证码'}
                </button>
              </div>

              {/* User Consent checklist */}
              <label className="flex items-start gap-2.5 cursor-pointer pt-2 pb-1">
                <input
                  type="checkbox"
                  id="userAgreement"
                  required
                  checked={userAgreement}
                  onChange={(e) => setUserAgreement(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-brand-red focus:ring-brand-red bg-white h-5 w-5 transition duration-150"
                />
                <span className="text-sm text-slate-600 leading-normal select-none font-medium">
                  勾选代表同意{' '}
                  <button
                    type="button"
                    onClick={() => setIsAgreementOpen(true)}
                    className="text-brand-coolBlue underline font-bold"
                  >
                    《用户须知》
                  </button>
                </span>
              </label>

              {/* Direct enrollment reservation trigger */}
              <button
                type="submit"
                className="w-full h-[54px] bg-brand-red hover:bg-[#B11B24] text-white font-black text-base rounded-xl transition duration-150 active:scale-[0.98] shadow-md shadow-brand-red/20 flex items-center justify-center tracking-wider"
              >
                立即报名
              </button>
            </form>
          </div>
        </section>

        {/* 6. Academic Agenda / Syllabus Modules */}
        <section className="px-6 py-8 bg-brand-bgLight">
          <div className="mb-6">
            <span className="text-xs font-bold text-brand-red tracking-widest uppercase block mb-1.5">
              03 / ACADEMIC AGENDA
            </span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-6 bg-brand-red rounded-full"></span>
              <h2 className="text-xl font-black text-brand-dark tracking-tight">核心内容</h2>
            </div>
          </div>

          <div className="space-y-4">
            {/* Unit module 1 */}
            <div className="bg-white border-l-4 border-brand-red rounded-r-2xl p-5 shadow-sm flex gap-4 items-start min-h-[110px]">
              <div className="w-8 h-8 rounded-full bg-brand-red/5 flex items-center justify-center text-brand-red font-black text-sm flex-shrink-0 mt-0.5">
                01
              </div>
              <div>
                <h3 className="text-base font-black text-brand-dark mb-1.5 leading-snug">
                  趋势洞察：学历提升的职场价值
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  解析技术岗晋升逻辑，看懂硕士学历的职业护城河作用
                </p>
              </div>
            </div>

            {/* Unit module 2 */}
            <div className="bg-white border-l-4 border-brand-red rounded-r-2xl p-5 shadow-sm flex gap-4 items-start min-h-[110px]">
              <div className="w-8 h-8 rounded-full bg-brand-red/5 flex items-center justify-center text-brand-red font-black text-sm flex-shrink-0 mt-0.5">
                02
              </div>
              <div>
                <h3 className="text-base font-black text-brand-dark mb-1.5 leading-snug">
                  路径避坑：正规硕士项目辨别指南
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  盘点学历提升路径，教你识别正规项目、规避升学陷阱
                </p>
              </div>
            </div>

            {/* Unit module 3 */}
            <div className="bg-white border-l-4 border-brand-red rounded-r-2xl p-5 shadow-sm flex gap-4 items-start min-h-[110px]">
              <div className="w-8 h-8 rounded-full bg-brand-red/5 flex items-center justify-center text-brand-red font-black text-sm flex-shrink-0 mt-0.5">
                03
              </div>
              <div>
                <h3 className="text-base font-black text-brand-dark mb-1.5 leading-snug">
                  项目详解：HPU MSAI高性价比AI硕士
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  拆解前沿 AI课程、申请门槛与高薪岗位对标优势
                </p>
              </div>
            </div>

            {/* Unit module 4 */}
            <div className="bg-white border-l-4 border-brand-red rounded-r-2xl p-5 shadow-sm flex gap-4 items-start min-h-[110px]">
              <div className="w-8 h-8 rounded-full bg-brand-red/5 flex items-center justify-center text-brand-red font-black text-sm flex-shrink-0 mt-0.5">
                04
              </div>
              <div>
                <h3 className="text-base font-black text-brand-dark mb-1.5 leading-snug">
                  项目详解：Stevens MSCS高就业计算机硕士
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  分析硬核课程、高就业率与技术行业薪资竞争力
                </p>
              </div>
            </div>

            {/* Unit module 5 */}
            <div className="bg-white border-l-4 border-brand-red rounded-r-2xl p-5 shadow-sm flex gap-4 items-start min-h-[110px]">
              <div className="w-8 h-8 rounded-full bg-brand-red/5 flex items-center justify-center text-brand-red font-black text-sm flex-shrink-0 mt-0.5">
                05
              </div>
              <div>
                <h3 className="text-base font-black text-brand-dark mb-1.5 leading-snug">
                  案例复盘：学员职业跃迁真实收获
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  分享技术提升、升职加薪、跳槽认可的实战案例
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Academic Mentor Portfolio details */}
        <section className="px-6 py-8 border-t border-brand-border bg-white">
          <div className="mb-6">
            <span className="text-xs font-bold text-brand-red tracking-widest uppercase block mb-1.5">
              04 / PROGRAM MENTOR
            </span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-6 bg-brand-red rounded-full"></span>
              <h2 className="text-xl font-black text-brand-dark tracking-tight">讲师介绍</h2>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-brand-bgLight border border-brand-border rounded-2xl p-5 flex gap-4 items-center min-h-[120px]">
              {/* Profile high definition portrait */}
              <div className="w-24 h-24 rounded-full bg-white border border-slate-200 flex-shrink-0 overflow-hidden relative shadow-sm">
                <img
                  src="https://i.ibb.co/d4ycSx4y/Ag-AABe-Bvuytd0hzmo-Vt-LKok-Oi-E-DKo0.jpg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80';
                  }}
                  alt="Rae Yang 老师"
                  className="w-full h-full object-cover object-top scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-black text-lg text-brand-dark">Rae Yang</span>
                  <span className="px-2.5 py-0.5 bg-brand-red/10 text-brand-red text-xs rounded font-bold">
                    项目负责人
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-500 mb-1.5">美国AI硕士项目负责人</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  6年+美国硕士咨询经验，曾助力1000+职场人学历提升；熟悉国内外各类提升路径，咨询规划经验丰富，以专业、亲和收获众多学员好评，现任美国硕博项目负责人。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Sequential Learning Flow steps */}
        <section className="px-6 py-8 border-t border-brand-border bg-brand-bgLight">
          <div className="mb-6">
            <span className="text-xs font-bold text-brand-red tracking-widest uppercase block mb-1.5">
              05 / LEARNING STEPS
            </span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-6 bg-brand-red rounded-full"></span>
              <h2 className="text-xl font-black text-brand-dark tracking-tight">学习流程</h2>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            {/* Step 1 */}
            <div className="bg-white border border-brand-border/60 rounded-xl p-2.5 py-4 flex flex-col items-center text-center relative shadow-sm h-full justify-start min-h-[145px] hover:shadow transition duration-200">
              <span className="absolute top-1 left-2 text-sm font-black text-slate-200 select-none">
                01
              </span>
              <div className="text-brand-red my-3.5 flex items-center justify-center">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm-1 16H8V5h8v12z" />
                </svg>
              </div>
              <p className="text-xs font-black text-brand-dark leading-snug mt-1">
                手机验证码报名
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-brand-border/60 rounded-xl p-2.5 py-4 flex flex-col items-center text-center relative shadow-sm h-full justify-start min-h-[145px] hover:shadow transition duration-200">
              <span className="absolute top-1 left-2 text-sm font-black text-slate-200 select-none">
                02
              </span>
              <div className="text-brand-red my-3.5 flex items-center justify-center">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v2h-3v-2zm-3 3h3v3h-3v-3zm3 3h3v2h-3v-2zm-3-3h-2v-2h2v2zm4-2h2v2h-2v-2zm-4 4h2v2h-2v-2zm-2 2h2v2h-2v-2zm4 0h2v2h-2v-2z" />
                </svg>
              </div>
              <p className="text-xs font-black text-brand-dark leading-snug mt-1">
                扫二维码
                <br />
                加班主任微信
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-brand-border/60 rounded-xl p-2.5 py-4 flex flex-col items-center text-center relative shadow-sm h-full justify-start min-h-[145px] hover:shadow transition duration-200">
              <span className="absolute top-1 left-2 text-sm font-black text-slate-200 select-none">
                03
              </span>
              <div className="text-brand-red my-3.5 flex items-center justify-center">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-9 9H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z" />
                </svg>
              </div>
              <p className="text-xs font-black text-brand-dark leading-snug mt-1">
                接受邀请
                <br />
                进入直播群
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white border border-brand-border/60 rounded-xl p-2.5 py-4 flex flex-col items-center text-center relative shadow-sm h-full justify-start min-h-[145px] hover:shadow transition duration-200">
              <span className="absolute top-1 left-2 text-sm font-black text-slate-200 select-none">
                04
              </span>
              <div className="text-brand-red my-3.5 flex items-center justify-center">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm-9 12V7l6 4-6 4z" />
                </svg>
              </div>
              <p className="text-xs font-black text-brand-dark leading-snug mt-1">
                上直播课
                <br />
                学习交流
              </p>
            </div>
          </div>
        </section>

        {/* 9. Footing Corporate Copyright disclaimer line */}
        <footer className="mt-auto px-6 py-8 bg-brand-dark text-slate-400 text-xs text-center space-y-2 border-t border-slate-800">
          <p className="text-white font-black text-sm mb-1.5">
            北京无忧创想信息技术有限公司
          </p>
          <p>
            联系我们：
            <a
              href="tel:400-101-1651"
              className="text-slate-400 font-bold hover:text-white hover:underline transition duration-150"
            >
              400-101-1651
            </a>
          </p>
          <p className="tracking-wide text-slate-500">
            Copyright © 2005-2026 51CTO.com
          </p>
          <p className="text-slate-500">京ICP备09067568号-5</p>
        </footer>

        {/* 10. Sticky absolute/fixed Bottom booking ribbon */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-brand-border px-5 py-3.5 flex justify-between items-center z-40 shadow-[0_-5px_15px_rgba(0,0,0,0.06)]">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold tracking-wider">
              限时专项免费营
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xs text-brand-red font-bold">¥</span>
              <span className="text-2xl font-black text-brand-red leading-none">0.00</span>
            </div>
          </div>
          <button
            onClick={scrollToSignUp}
            className="px-8 py-3 bg-brand-red hover:bg-[#B11B24] text-white font-extrabold text-sm rounded-xl transition duration-150 active:scale-95 shadow-md shadow-brand-red/10 flex items-center gap-1.5 cursor-pointer"
          >
            <span>立即报名</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>

        {/* Global High contrast Toast container */}
        <div
          id="toast"
          className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-brand-dark border border-slate-750 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 transition-all duration-300 transform max-w-[85%] ${
            isToastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <span id="toastIcon">{toastIcon}</span>
          <span id="toastMessage">{toastMessage}</span>
        </div>

        {/* Modal: Terms Consent agreementModal */}
        <div
          id="agreementModal"
          className={`fixed inset-0 bg-brand-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 transition-all duration-300 ${
            isAgreementOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div
            className={`bg-white border border-brand-border w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 flex flex-col max-h-[80vh] ${
              isAgreementOpen ? 'scale-100' : 'scale-95'
            }`}
          >
            <div className="p-5 border-b border-brand-border flex justify-between items-center bg-slate-50">
              <h3 className="font-extrabold text-brand-dark text-xs">用户须知</h3>
              <button
                onClick={() => setIsAgreementOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-5 overflow-y-auto text-xs text-slate-500 space-y-3 leading-relaxed">
              <p className="font-bold text-brand-dark text-xs">欢迎您报名参与本次AI与计算机在职硕士申请训练营。</p>
              <p>1. 本次活动为51CTO特邀合作的名校在职硕士申请服务，学员通过页面提交手机号及验证码代表已完成意向预定。</p>
              <p>2. 提交申请后，我们的行业顾问和课程导师将通过短信或微信方式联系您，为您提供1v1的背景预评估服务。</p>
              <p>3. 我们严格遵守国家相关法律，严格保密学员隐私，绝不向任何第三方机构泄露您的个人信息。</p>
              <p>4. 报名的学员，务必主动添加班主任老师微信以便能够顺利收取对应的专属入学申请攻略、资料包 and 讲堂邀请。</p>
            </div>
            <div className="p-4 bg-slate-50 border-t border-brand-border">
              <button
                onClick={() => setIsAgreementOpen(false)}
                className="w-full py-3 bg-brand-red hover:bg-[#B11B24] text-white font-bold text-xs rounded-xl transition duration-150"
              >
                同意并返回
              </button>
            </div>
          </div>
        </div>

        {/* Modal: Success Scan WhatsApp teacher connection overlay */}
        <div
          id="successModal"
          className={`fixed inset-0 bg-brand-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 transition-all duration-300 ${
            isSuccessOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div
            className={`bg-white border border-brand-border w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl relative transform transition-all duration-300 ${
              isSuccessOpen ? 'scale-100' : 'scale-95'
            }`}
          >
            <div className="h-2 bg-gradient-to-r from-brand-red to-brand-coolBlue"></div>

            <div className="p-6 text-center animate-fade-in">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                ✓
              </div>

              <h3 className="text-sm font-black text-brand-dark mb-1">恭喜您，已完成报名！</h3>
              <p className="text-[11px] text-brand-red font-bold mb-5 flex items-center justify-center gap-1">
                ⚠️ 请务必添加下方班主任微信
              </p>

              {/* qr layout mimicking exactly */}
              <div className="bg-brand-bgLight p-3 rounded-2xl w-40 h-40 mx-auto mb-4 relative flex flex-col items-center justify-center border border-brand-border shadow-inner">
                <div className="w-full h-full border border-slate-200 rounded-xl relative overflow-hidden flex flex-col items-center justify-center bg-white">
                  <div className="grid grid-cols-4 gap-1 w-20 h-20 opacity-30">
                    <div className="bg-slate-800 rounded-sm"></div>
                    <div className="bg-slate-800 rounded-sm"></div>
                    <div className="border-2 border-slate-800 rounded-sm"></div>
                    <div className="bg-slate-800 rounded-sm"></div>
                    <div className="border-2 border-slate-800 rounded-sm"></div>
                    <div className="bg-slate-800 rounded-sm"></div>
                    <div className="bg-slate-800 rounded-sm"></div>
                    <div className="border-2 border-slate-800 rounded-sm"></div>
                    <div className="bg-slate-800 rounded-sm"></div>
                    <div className="border-2 border-slate-800 rounded-sm"></div>
                    <div className="bg-slate-800 rounded-sm"></div>
                    <div className="bg-slate-800 rounded-sm"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-brand-red text-white text-[10px] px-2.5 py-1.5 rounded-lg shadow-md font-bold animate-pulse text-center leading-tight">
                      长按识码加群
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500 mb-6 px-4 leading-relaxed">
                扫码添加班主任微信，领取您的
                <br />
                <span className="text-brand-coolBlue font-bold">【专属硕士申请资料包】</span>并开始入学预估
              </p>

              <button
                onClick={() => setIsSuccessOpen(false)}
                className="w-full py-3 bg-brand-dark text-white font-bold text-xs rounded-xl transition duration-150"
              >
                确定
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
