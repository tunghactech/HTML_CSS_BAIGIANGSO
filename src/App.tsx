import { useState, useEffect, useRef } from "react";
import {
  BookOpen,
  Code,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  Play,
  RefreshCw,
  Eye,
  Copy,
  Award,
  Info,
  Globe,
  Cpu,
  Check,
  Terminal,
  ArrowRight,
  Sparkles,
  Layers,
  FileCode,
  GraduationCap,
  X,
  ExternalLink,
  Camera,
  Laptop,
  ChevronLeft,
  Maximize2,
  Monitor,
  Tablet,
  Smartphone
} from "lucide-react";
import { CURRICULUM_DATA } from "./data/lessons";
import { Exercise, Lesson, StudentProgress } from "./types";

export default function App() {
  // Load progress from localStorage
  const [progress, setProgress] = useState<StudentProgress>(() => {
    const saved = localStorage.getItem("student_curriculum_progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          completedLessons: parsed.completedLessons || [],
          completedExercises: parsed.completedExercises || [],
          savedCode: parsed.savedCode || {},
        };
      } catch (e) {
        console.error(e);
      }
    }
    return {
      completedLessons: [],
      completedExercises: [],
      savedCode: {},
    };
  });

  // State managers
  const [activeSectionId, setActiveSectionId] = useState("phan-1");
  const [activeLesson, setActiveLesson] = useState<Lesson>(CURRICULUM_DATA[0].lessons[0]);
  const [activeExercise, setActiveExercise] = useState<Exercise>(CURRICULUM_DATA[0].lessons[0].exercises[0]);
  const [currentCode, setCurrentCode] = useState(activeExercise.defaultCode);
  const [previewKey, setPreviewKey] = useState(0); // For forcing iframe re-render
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Interactive Workspace State (True when editor is expanded/opened for active exercise)
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isSolutionVisible, setIsSolutionVisible] = useState(false);
  const [showWorkspaceInstructions, setShowWorkspaceInstructions] = useState(true);

  // Tab panels in textbook view
  const [workbookTab, setWorkbookTab] = useState<"details" | "objectives">("details");

  // Tab panels inside Sandbox preview
  const [previewTab, setPreviewTab] = useState<"user" | "solution">("user");

  // Modern interactive workspace preview layouts: "split" (song song), "user" (chỉ bài làm), "solution" (chỉ hình mẫu)
  const [previewMode, setPreviewMode] = useState<"split" | "user" | "solution">("split");
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [zoomDeviceWidth, setZoomDeviceWidth] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isHoveringSpecimen, setIsHoveringSpecimen] = useState(false);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0, clientX: 0, clientY: 0 });

  // Interactive URL Parser game states
  const [urlAnswers, setUrlAnswers] = useState({
    protocol: "",
    subdomain: "",
    domain: "",
    tld: "",
    port: "",
    path: "",
    filename: ""
  });
  const [urlScore, setUrlScore] = useState<null | boolean>(null);

  // Classify Web Tech game states
  const [classifications, setClassifications] = useState<{ [techName: string]: string }>({});
  const [classificationScore, setClassificationScore] = useState<null | string>(null);

  // Success notifications (toast)
  const [notification, setNotification] = useState<string | null>(null);

  // Update code when exercise changes
  useEffect(() => {
    const saved = progress.savedCode[activeExercise.id];
    if (saved) {
      setCurrentCode(saved);
    } else {
      setCurrentCode(activeExercise.defaultCode);
    }
    // Clear interactive game results and solution visibility when moving
    setUrlScore(null);
    setClassificationScore(null);
    setIsSolutionVisible(false);
    setPreviewTab("user");
  }, [activeExercise, progress.savedCode]);

  // Persist progress to localStorage
  useEffect(() => {
    localStorage.setItem("student_curriculum_progress", JSON.stringify(progress));
  }, [progress]);

  // Helper to trigger temporary toast
  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Run/Refresh preview
  const handleRunCode = () => {
    setProgress(prev => {
      const updatedSaved = { ...prev.savedCode, [activeExercise.id]: currentCode };
      return { ...prev, savedCode: updatedSaved };
    });
    setPreviewKey(prev => prev + 1);
    showToast("Đã cập nhật giao diện xem trước! ⚡");
  };

  // Reset to default
  const handleResetCode = () => {
    if (confirm("Bạn có chắc muốn khôi phục mã nguồn ban đầu của bài học này? Mọi sửa đổi của bạn sẽ bị xóa.")) {
      setCurrentCode(activeExercise.defaultCode);
      setProgress(prev => {
        const updatedSaved = { ...prev.savedCode };
        delete updatedSaved[activeExercise.id];
        return { ...prev, savedCode: updatedSaved };
      });
      setPreviewKey(prev => prev + 1);
      showToast("Đã khôi phục mã nguồn ban đầu!");
    }
  };

  // Apply complete solution
  const handleShowSolution = () => {
    setCurrentCode(activeExercise.solutionCode);
    setIsSolutionVisible(true);
    showToast("Đã áp dụng mã đáp án mẫu!");
  };

  // Copy code to clipboard
  const handleCopyCode = (codeToCopy: string = currentCode) => {
    navigator.clipboard.writeText(codeToCopy);
    showToast("Đã copy mã nguồn vào bộ nhớ đệm!");
  };

  // Complete exercise trigger
  const handleToggleCompleteExercise = (exId: string) => {
    setProgress(prev => {
      const alreadyCompleted = prev.completedExercises.includes(exId);
      let updatedExercises;
      if (alreadyCompleted) {
        updatedExercises = prev.completedExercises.filter(id => id !== exId);
      } else {
        updatedExercises = [...prev.completedExercises, exId];
      }
      
      // Update completed lessons based on exercises in active lesson
      const currentLessonExs = activeLesson.exercises.map(e => e.id);
      const allCurrentCompleted = currentLessonExs.every(id => updatedExercises.includes(id));
      
      let updatedLessons = [...prev.completedLessons];
      if (allCurrentCompleted && !updatedLessons.includes(activeLesson.id)) {
        updatedLessons.push(activeLesson.id);
      } else if (!allCurrentCompleted) {
        updatedLessons = updatedLessons.filter(id => id !== activeLesson.id);
      }

      return {
        ...prev,
        completedExercises: updatedExercises,
        completedLessons: updatedLessons
      };
    });
    
    const isNowDone = !progress.completedExercises.includes(exId);
    showToast(isNowDone ? "🎉 Đã đánh dấu hoàn thành bài tập!" : "Đã hủy đánh dấu hoàn thành bài tập.");
  };

  // Insert code snippets helper in editor
  const handleInsertTag = (tagOpen: string, tagClose: string = "") => {
    const textarea = document.getElementById("code-textarea") as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    const selected = text.substring(start, end);

    const replacement = tagOpen + selected + tagClose;
    setCurrentCode(before + replacement + after);
    
    // Reset focus
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tagOpen.length, start + tagOpen.length + selected.length);
    }, 0);
  };

  // Calculate statistics
  const totalExercises = CURRICULUM_DATA.flatMap(s => s.lessons.flatMap(l => l.exercises)).length;
  const completedExercisesCount = progress.completedExercises.length;
  const percentComplete = Math.round((completedExercisesCount / totalExercises) * 100) || 0;

  // URL parser validator
  const handleCheckUrlParser = () => {
    const isCorrect = 
      urlAnswers.protocol.toLowerCase().trim() === "https" &&
      urlAnswers.subdomain.toLowerCase().trim() === "lms" &&
      urlAnswers.domain.toLowerCase().trim() === "truonghoc" &&
      urlAnswers.tld.toLowerCase().trim() === "edu.vn" &&
      urlAnswers.port.trim() === "8080" &&
      urlAnswers.path.toLowerCase().trim() === "khoa-it/" &&
      urlAnswers.filename.toLowerCase().trim() === "baitap.html";

    setUrlScore(isCorrect);
    if (isCorrect) {
      if (!progress.completedExercises.includes(activeExercise.id)) {
        handleToggleCompleteExercise(activeExercise.id);
      }
    }
  };

  // Classification matcher validator
  const handleClassifyTech = (tech: string, category: string) => {
    setClassifications(prev => ({ ...prev, [tech]: category }));
  };

  const handleCheckClassification = () => {
    const correctMap: { [key: string]: string } = {
      "Google Chrome": "client",
      "Apache": "server",
      "PHP": "dynamic",
      "Internet Information Services (IIS)": "server",
      "Mozilla Firefox": "client",
      "ASP.NET": "dynamic"
    };

    let correctCount = 0;
    const keys = Object.keys(correctMap);
    keys.forEach(key => {
      if (classifications[key] === correctMap[key]) {
        correctCount++;
      }
    });

    if (correctCount === keys.length) {
      setClassificationScore("Đúng tuyệt đối! Bạn đã phân loại chính xác toàn bộ 6 công nghệ.");
      if (!progress.completedExercises.includes(activeExercise.id)) {
        handleToggleCompleteExercise(activeExercise.id);
      }
    } else {
      setClassificationScore(`Bạn trả lời đúng ${correctCount}/${keys.length} công nghệ. Hãy thử lại nhé!`);
    }
  };

  // Function to return appropriate dynamic hints/examples based on exercise ID
  const getExerciseExamples = (exerciseId: string) => {
    if (exerciseId.includes("bai-1-1")) {
      return {
        example: `<center>\n  <h1><b>Tiêu đề lớn in đậm căn giữa</b></h1>\n</center>\n<p align="right">Đoạn văn căn lề phải</p>`,
        note: "Thẻ <center> căn giữa nội dung. Thẻ <u> tạo gạch chân. Thẻ <b> tạo in đậm."
      };
    } else if (exerciseId.includes("bai-1-2")) {
      return {
        example: `<div style="background-color: #00FFFF; color: #0000FF; padding: 15px;">\n  <i>Bài thơ viết nghiêng trên nền xanh ngọc</i>\n</div>\n<hr width="150px">`,
        note: "Dùng các cặp thẻ <i> để viết chữ nghiêng, <br> để xuống dòng và thuộc tính background-color để tạo màu nền."
      };
    } else if (exerciseId.includes("bai-1-3")) {
      return {
        example: `<p>Nước: H<sub>2</sub>O</p>\n<p>Phương trình: x<sup>2</sup> + y<sup>2</sup> = z<sup>2</sup></p>\n<pre style="background: #09C; color: white;">\n  Giữ nguyên định dạng\n  khoảng trắng và dòng\n</pre>`,
        note: "Thẻ <sub> dùng cho chỉ số dưới (hóa học). Thẻ <sup> dùng cho chỉ số trên (toán học số mũ). Thẻ <pre> giữ nguyên định dạng xuống dòng và khoảng trắng."
      };
    } else if (exerciseId.includes("bai-1-4")) {
      return {
        example: `<a href="https://vnexpress.net" target="_blank">Đọc Báo VnExpress</a>\n<a href="mailto:admin@hactech.edu.vn">Gửi Email Liên Hệ</a>`,
        note: "Thuộc tính target=\"_blank\" giúp mở liên kết trong tab mới. Cú pháp mailto: giúp mở trình soạn thư điện tử."
      };
    } else if (exerciseId.includes("bai-2-3")) {
      return {
        example: `<ol type="I">\n  <li>Chủ đề lớn I\n    <ol type="1">\n      <li>Mục con 1</li>\n      <li>Mục con 2</li>\n    </ol>\n  </li>\n</ol>`,
        note: "Sử dụng thuộc tính type='I' của thẻ <ol> để tạo số La Mã, lồng các thẻ <ol> bên trong thẻ <li> để tạo danh mục phân cấp bậc."
      };
    } else if (exerciseId.includes("bai-2-5")) {
      return {
        example: `<table border="1" style="border-collapse: collapse; width: 100%;">\n  <tr>\n    <th colspan="2">Gộp 2 cột</th>\n  </tr>\n  <tr>\n    <td rowspan="2">Gộp 2 hàng</td>\n    <td>Dòng 1</td>\n  </tr>\n  <tr>\n    <td>Dòng 2</td>\n  </tr>\n</table>`,
        note: "Sử dụng thuộc tính colspan để gộp cột ngang và rowspan để gộp hàng dọc. Dùng border-collapse: collapse để bảng có nét kẻ mỏng thanh mảnh."
      };
    } else if (exerciseId.includes("bai-3")) {
      return {
        example: `<form action="#" method="post">\n  <fieldset>\n    <legend>Thông tin đăng nhập</legend>\n    <label>Tài khoản: <input type="text" required></label>\n    <label>Mật khẩu: <input type="password" required></label>\n    <button type="submit">Đăng Nhập</button>\n  </fieldset>\n</form>`,
        note: "Thẻ <fieldset> nhóm các trường nhập liệu lại kèm đường viền bao quanh, thẻ <legend> tạo nhãn cho nhóm đó. Thuộc tính required ngăn chặn submit form trống."
      };
    } else {
      // General fallbacks
      return {
        example: `<!-- Thao tác HTML cơ bản -->\n<div style="padding: 10px; border: 1px dashed #ef4444;">\n  <h3>Cấu trúc gợi ý</h3>\n  <p>Thực hiện viết các thẻ lồng nhau chính xác.</p>\n</div>`,
        note: "Hãy chú ý đóng đầy đủ các thẻ mở. CSS style có thể viết trực tiếp trong thuộc tính style=\"...\" của thẻ (Inline CSS) hoặc viết trong thẻ <style>."
      };
    }
  };

  const exerciseExamples = getExerciseExamples(activeExercise.id);

  return (
    <div id="app-root" className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 bg-gradient-to-r from-red-600 to-rose-700 text-white px-6 py-3 rounded-lg shadow-2xl z-50 flex items-center gap-3 border border-red-500/30 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span className="font-semibold text-sm">{notification}</span>
        </div>
      )}

      {/* Main Header */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center shadow-lg border border-red-500 shrink-0">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs bg-red-800 text-red-100 px-2 py-0.5 rounded font-mono font-bold">HACTECH CNTT</span>
              <span className="text-xs text-slate-400 font-mono">BÀI GIẢNG SỐ TƯƠNG TÁC</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Môn học thực hành HTML & CSS <span className="text-sm font-normal text-slate-400 hidden sm:inline">(Hệ Cao Đẳng)</span>
            </h1>
          </div>
        </div>

        {/* Global Progress */}
        <div className="flex items-center gap-4 bg-slate-900/80 p-2.5 px-4 rounded-xl border border-slate-800 w-full md:w-auto">
          <div className="text-left hidden sm:block">
            <p className="text-xs text-slate-400 font-medium">Tiến trình học tập của bạn</p>
            <p className="text-sm font-bold text-white font-mono">{completedExercisesCount}/{totalExercises} bài thực hành ({percentComplete}%)</p>
          </div>
          <div className="flex-1 md:w-32 bg-slate-800 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-red-600 to-rose-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
          {percentComplete === 100 && (
            <div className="bg-amber-500/20 text-amber-300 p-1.5 rounded-lg border border-amber-500/30">
              <Award className="w-5 h-5 animate-pulse" />
            </div>
          )}
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Toggle Sidebar Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute left-4 bottom-4 z-40 bg-slate-950 p-2.5 rounded-full border border-slate-800 text-slate-300 shadow-xl hover:text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
          title={isSidebarOpen ? "Thu gọn danh mục" : "Mở rộng danh mục"}
        >
          <Layers className="w-5 h-5" />
        </button>

        {/* Sidebar - Syllabus Tree */}
        <aside className={`${isSidebarOpen ? "w-80" : "w-0"} bg-slate-950 border-r border-slate-800 transition-all duration-300 overflow-y-auto flex flex-col shrink-0`}>
          <div className="p-4 border-b border-slate-800 bg-slate-900/40">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> MỤC LỤC GIÁO TRÌNH
            </p>
            <p className="text-[11px] text-slate-500 leading-relaxed">Chọn bài thực hành để mở trình biên dịch trực tiếp (Try It Yourself)</p>
          </div>

          <div className="flex-1 p-3 space-y-4">
            {CURRICULUM_DATA.map(section => (
              <div key={section.id} className="space-y-1">
                <button 
                  onClick={() => setActiveSectionId(section.id)}
                  className={`w-full text-left font-bold text-xs p-2.5 rounded-lg flex justify-between items-center transition-all ${
                    activeSectionId === section.id 
                      ? "bg-slate-800 text-red-400 border border-slate-700" 
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <span className="truncate">{section.title}</span>
                  <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform ${activeSectionId === section.id ? "" : "-rotate-90"}`} />
                </button>

                {activeSectionId === section.id && (
                  <div className="pl-2 pr-1 pt-1 space-y-3 border-l border-slate-800 ml-2 mt-1">
                    {section.lessons.map(lesson => (
                      <div key={lesson.id} className="space-y-1">
                        <div className="p-1 px-2 text-[11px] font-bold text-slate-400 flex items-center justify-between">
                          <span className="truncate">{lesson.title}</span>
                          <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded shrink-0 font-mono">{lesson.duration}</span>
                        </div>
                        
                        <div className="space-y-0.5">
                          {lesson.exercises.map(ex => {
                            const isCurrent = activeExercise.id === ex.id;
                            const isCompleted = progress.completedExercises.includes(ex.id);
                            return (
                              <button
                                key={ex.id}
                                onClick={() => {
                                  setActiveLesson(lesson);
                                  setActiveExercise(ex);
                                  setIsWorkspaceOpen(false); // Return to handbook view on selection change for cleanliness
                                }}
                                className={`w-full text-left text-xs p-2 px-3 rounded-md flex items-center gap-2 transition-all ${
                                  isCurrent 
                                    ? "bg-gradient-to-r from-red-950/60 to-slate-900 text-slate-100 border-l-4 border-red-600 font-medium" 
                                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                                }`}
                              >
                                {isCompleted ? (
                                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                                ) : (
                                  <Code className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                                )}
                                <span className="truncate">{ex.title}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-800 bg-slate-950 text-slate-500 text-xs flex flex-col gap-2">
            <div className="flex items-center gap-1.5 justify-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Chế độ: Thực hành Ngoại tuyến</span>
            </div>
            <p className="text-[10px] text-center">Bản quyền © 2026 Trường Cao đẳng Nghề Bách Khoa Hà Nội</p>
          </div>
        </aside>

        {/* Content Area (Workbook OR Try It Yourself IDE Workspace) */}
        <main className="flex-1 flex overflow-hidden bg-slate-900">
          
          {!isWorkspaceOpen ? (
            /* ======================================================== */
            /* WORKBOOK MODE (Default textbook layout)                 */
            /* ======================================================== */
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              
              {/* Left Column: Lesson details, Instructions, Games & Specific Examples */}
              <div className="flex-1 md:w-[50%] border-r border-slate-800 flex flex-col overflow-y-auto">
                
                {/* Header Banner */}
                <div className="p-6 bg-gradient-to-b from-slate-950 to-slate-900 border-b border-slate-800">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800/40">
                      {activeLesson.title.split(".")[0]}
                    </span>
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      Thời lượng: {activeLesson.duration}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white leading-tight mb-2">{activeExercise.title}</h2>
                  <p className="text-slate-400 text-xs leading-relaxed">{activeExercise.description}</p>
                </div>

                {/* Sub-tabs inside Textbook: Details vs Lesson Objectives */}
                <div className="flex bg-slate-950 border-b border-slate-800 sticky top-0 z-10">
                  <button 
                    onClick={() => setWorkbookTab("details")}
                    className={`flex-1 text-center py-3 font-bold text-xs border-b-2 transition-all ${
                      workbookTab === "details" 
                        ? "border-red-600 text-white bg-slate-900/50" 
                        : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    BÀI TẬP & HƯỚNG DẪN CHI TIẾT
                  </button>
                  <button 
                    onClick={() => setWorkbookTab("objectives")}
                    className={`flex-1 text-center py-3 font-bold text-xs border-b-2 transition-all ${
                      workbookTab === "objectives" 
                        ? "border-red-600 text-white bg-slate-900/50" 
                        : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    MỤC TIÊU BÀI GIẢNG SỐ
                  </button>
                </div>

                {/* Tab content wrapper */}
                <div className="p-6 space-y-6">
                  
                  {workbookTab === "details" ? (
                    <div className="space-y-6 animate-fadeIn">
                      
                      {/* 1. INTRODUCTION SECTION */}
                      <div className="space-y-2">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5 text-red-500" /> Giới thiệu lý thuyết ứng dụng:
                        </h3>
                        <p className="text-xs text-slate-300 bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 leading-relaxed font-sans">
                          {activeLesson.intro}
                        </p>
                      </div>

                      {/* 2. SPECIFIC INTERACTIVE GAMES FOR GENERAL WEB (PHẦN 1 ONLY) */}
                      {activeExercise.id === "url-parser-tool" && (
                        <div className="space-y-5">
                          {/* URL parser simulator */}
                          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-4 shadow-xl">
                            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                              <Globe className="w-4 h-4 text-amber-400" />
                              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Hệ Thống Mô Phỏng Phân Tích URL</h4>
                            </div>
                            
                            <div className="space-y-3 text-xs">
                              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800/80 break-all font-mono text-center">
                                <span className="text-slate-400 font-sans block text-[10px] mb-1">URL đề bài yêu cầu bóc tách:</span>
                                <span className="text-amber-300 font-bold text-sm">https://lms.truonghoc.edu.vn:8080/khoa-it/baitap.html</span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                <div>
                                  <label className="block text-[10px] text-slate-400 mb-1">1. Giao thức (Protocol)</label>
                                  <input 
                                    type="text" 
                                    value={urlAnswers.protocol}
                                    onChange={(e) => setUrlAnswers(p => ({ ...p, protocol: e.target.value }))}
                                    placeholder="Ví dụ: http"
                                    className="w-full bg-slate-900 border border-slate-800 p-2 rounded text-white font-mono text-xs focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] text-slate-400 mb-1">2. Tên miền con (Subdomain)</label>
                                  <input 
                                    type="text" 
                                    value={urlAnswers.subdomain}
                                    onChange={(e) => setUrlAnswers(p => ({ ...p, subdomain: e.target.value }))}
                                    placeholder="Ví dụ: www"
                                    className="w-full bg-slate-900 border border-slate-800 p-2 rounded text-white font-mono text-xs focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] text-slate-400 mb-1">3. Tên miền cấp 2 (Domain)</label>
                                  <input 
                                    type="text" 
                                    value={urlAnswers.domain}
                                    onChange={(e) => setUrlAnswers(p => ({ ...p, domain: e.target.value }))}
                                    placeholder="Ví dụ: google"
                                    className="w-full bg-slate-900 border border-slate-800 p-2 rounded text-white font-mono text-xs focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] text-slate-400 mb-1">4. Tên miền quốc gia/TLD</label>
                                  <input 
                                    type="text" 
                                    value={urlAnswers.tld}
                                    onChange={(e) => setUrlAnswers(p => ({ ...p, tld: e.target.value }))}
                                    placeholder="Ví dụ: edu.vn"
                                    className="w-full bg-slate-900 border border-slate-800 p-2 rounded text-white font-mono text-xs focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] text-slate-400 mb-1">5. Cổng kết nối (Port)</label>
                                  <input 
                                    type="text" 
                                    value={urlAnswers.port}
                                    onChange={(e) => setUrlAnswers(p => ({ ...p, port: e.target.value }))}
                                    placeholder="Ví dụ: 8080"
                                    className="w-full bg-slate-900 border border-slate-800 p-2 rounded text-white font-mono text-xs focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] text-slate-400 mb-1">6. Đường dẫn (Path)</label>
                                  <input 
                                    type="text" 
                                    value={urlAnswers.path}
                                    onChange={(e) => setUrlAnswers(p => ({ ...p, path: e.target.value }))}
                                    placeholder="Ví dụ: khoa-it/"
                                    className="w-full bg-slate-900 border border-slate-800 p-2 rounded text-white font-mono text-xs focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                                  />
                                </div>
                              </div>
                              <div className="pt-1">
                                <label className="block text-[10px] text-slate-400 mb-1">7. Tên tệp tin (File name)</label>
                                <input 
                                  type="text" 
                                  value={urlAnswers.filename}
                                  onChange={(e) => setUrlAnswers(p => ({ ...p, filename: e.target.value }))}
                                  placeholder="Ví dụ: baitap.html"
                                  className="w-full bg-slate-900 border border-slate-800 p-2 rounded text-white font-mono text-xs focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                                />
                              </div>

                              <button 
                                onClick={handleCheckUrlParser}
                                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-lg transition-all cursor-pointer flex justify-center items-center gap-2"
                              >
                                <Check className="w-4 h-4" /> Kiểm tra đáp án phân tích
                              </button>

                              {urlScore !== null && (
                                <div className={`p-3 rounded-lg text-center font-bold ${
                                  urlScore 
                                    ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800" 
                                    : "bg-rose-950/80 text-rose-400 border border-rose-800"
                                }`}>
                                  {urlScore 
                                    ? "✓ Chúc mừng! Bạn đã bóc tách chính xác toàn bộ cấu trúc URL mẫu. Đã đánh dấu hoàn thành bài học." 
                                    : "✗ Chưa chính xác. Gợi ý: Hãy chú ý dấu gạch chéo '/' của đường dẫn (khoa-it/) và định dạng viết thường."
                                  }
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Classification Game */}
                          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-4 shadow-xl">
                            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                              <Cpu className="w-4 h-4 text-emerald-400" />
                              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Trò Chơi Phân Loại Công Nghệ Web</h4>
                            </div>

                            <p className="text-xs text-slate-400 leading-relaxed">Hãy chọn chính xác vai trò kỹ thuật của các công cụ sau:</p>

                            <div className="space-y-3 text-xs">
                              {[
                                "Google Chrome",
                                "Apache",
                                "PHP",
                                "Internet Information Services (IIS)",
                                "Mozilla Firefox",
                                "ASP.NET"
                              ].map(tech => (
                                <div key={tech} className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-slate-900 p-2.5 rounded-lg border border-slate-800/80 gap-2">
                                  <span className="font-semibold text-slate-300 font-mono text-xs">{tech}</span>
                                  <select 
                                    value={classifications[tech] || ""}
                                    onChange={(e) => handleClassifyTech(tech, e.target.value)}
                                    className="bg-slate-950 border border-slate-800 p-1.5 text-white text-xs rounded-md focus:border-emerald-500"
                                  >
                                    <option value="">-- Chọn phân loại --</option>
                                    <option value="client">Web Browser (Máy khách)</option>
                                    <option value="server">Web Server (Máy chủ)</option>
                                    <option value="dynamic">Ngôn ngữ Web động</option>
                                  </select>
                                </div>
                              ))}

                              <button 
                                onClick={handleCheckClassification}
                                className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2.5 rounded-lg transition-all cursor-pointer flex justify-center items-center gap-2"
                              >
                                <Check className="w-4 h-4" /> Xác nhận kết quả phân loại
                              </button>

                              {classificationScore !== null && (
                                <div className={`p-3 rounded-lg text-center font-bold ${
                                  classificationScore.includes("tuyệt đối") 
                                    ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800" 
                                    : "bg-rose-950/80 text-rose-400 border border-rose-800"
                                }`}>
                                  {classificationScore}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 3. DETAILED STEPS/INSTRUCTIONS */}
                      <div className="bg-slate-950/40 p-5 rounded-xl border border-slate-800/60 space-y-3">
                        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-800/50 pb-2">
                          <Terminal className="w-4 h-4 text-red-500" /> Các bước hướng dẫn thực hành:
                        </h3>
                        <ul className="space-y-3">
                          {activeExercise.instructions.map((step, idx) => (
                            <li key={idx} className="flex gap-3 text-xs leading-relaxed text-slate-300">
                              <span className="w-5 h-5 bg-red-950 text-red-400 border border-red-900/40 rounded-full flex items-center justify-center shrink-0 font-mono text-[10px] font-bold">
                                {idx + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* 4. CONCRETE EXAMPLES & HINTS (MỤC YÊU CẦU ĐỀ BÀI) */}
                      <div className="bg-slate-950/50 p-5 rounded-xl border border-slate-800 space-y-3">
                        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1.5 text-amber-400">
                          <Sparkles className="w-4 h-4" /> Ví dụ tham khảo & Gợi ý cụ thể:
                        </h3>
                        <div className="space-y-4">
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                              <span>MÃ NGUỒN VÍ DỤ GỢI Ý:</span>
                              <button 
                                onClick={() => handleCopyCode(exerciseExamples.example)}
                                className="text-red-400 hover:text-red-300 flex items-center gap-1 font-sans font-bold uppercase transition-all"
                              >
                                <Copy className="w-3 h-3" /> Sao chép ví dụ
                              </button>
                            </div>
                            <pre className="p-3 bg-slate-950 text-emerald-400 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto border border-slate-800/80">
                              {exerciseExamples.example}
                            </pre>
                          </div>
                          
                          <p className="text-xs text-slate-400 italic leading-relaxed">
                            <span className="font-bold text-slate-300 not-italic">Chú thích: </span>
                            {exerciseExamples.note}
                          </p>
                        </div>
                      </div>

                    </div>
                  ) : (
                    /* OBJECTIVES TAB */
                    <div className="space-y-6 animate-fadeIn text-xs">
                      <div className="space-y-3 bg-slate-950/40 p-4 rounded-xl border border-slate-800/60">
                        <h4 className="font-bold uppercase tracking-wider text-[11px] text-red-400 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> 1. Về Kiến Thức (Knowledge)
                        </h4>
                        <ul className="list-disc list-inside space-y-1.5 text-slate-300 pl-2 leading-relaxed">
                          {activeLesson.objectives.knowledge.map((k, i) => (
                            <li key={i}>{k}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3 bg-slate-950/40 p-4 rounded-xl border border-slate-800/60">
                        <h4 className="font-bold uppercase tracking-wider text-[11px] text-emerald-400 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> 2. Về Kỹ Năng (Skills)
                        </h4>
                        <ul className="list-disc list-inside space-y-1.5 text-slate-300 pl-2 leading-relaxed">
                          {activeLesson.objectives.skills.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3 bg-slate-950/40 p-4 rounded-xl border border-slate-800/60">
                        <h4 className="font-bold uppercase tracking-wider text-[11px] text-blue-400 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> 3. Năng lực tự chủ (Autonomy)
                        </h4>
                        <ul className="list-disc list-inside space-y-1.5 text-slate-300 pl-2 leading-relaxed">
                          {activeLesson.objectives.autonomy.map((a, i) => (
                            <li key={i}>{a}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                </div>

              </div>

              {/* Right Column: Screenshot/Output Mockup of Expected Product & Action Launcher */}
              <div className="flex-1 md:w-[50%] flex flex-col bg-slate-950 p-6 overflow-y-auto">
                
                <div className="flex-1 flex flex-col justify-center items-center max-w-2xl mx-auto w-full space-y-6">
                  
                  {/* Photo Title & Indicator */}
                  <div className="text-center space-y-1 w-full">
                    <span className="text-[10px] font-mono uppercase bg-slate-900 border border-slate-800 text-slate-400 px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
                      <Camera className="w-3 h-3 text-red-500" /> ẢNH CHỤP SẢN PHẨM CẦN ĐẠT ĐƯỢC
                    </span>
                    <h3 className="text-sm font-semibold text-slate-300">Giao Diện Mẫu Bản Vẽ Thực Hành Chuẩn</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed">Xem sản phẩm mẫu cần xây dựng hiển thị thực tế dưới đây</p>
                  </div>

                  {/* Browser Mockup representing the photo/screenshot */}
                  <div className="w-full bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col animate-fadeIn">
                    {/* Window Header */}
                    <div className="bg-slate-950 px-4 py-3 flex items-center justify-between border-b border-slate-800 shrink-0">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                      </div>
                      {/* Fake Address Bar */}
                      <div className="bg-slate-900 text-[10px] font-mono text-slate-400 px-4 py-1 rounded-md w-1/2 text-center truncate flex items-center justify-center gap-1 border border-slate-800/80">
                        <Globe className="w-2.5 h-2.5 text-slate-500" />
                        <span>hactech.edu.vn/lab/{activeExercise.id}.html</span>
                      </div>
                      <div className="w-12 text-right">
                        <span className="text-[10px] font-mono bg-red-950 text-red-400 p-1 px-2 rounded-md font-bold">MẪU</span>
                      </div>
                    </div>

                    {/* Window Screen rendering solutionCode */}
                    <div className="bg-white h-[350px] overflow-hidden relative group">
                      <iframe
                        key={`sol-${activeExercise.id}`}
                        title="Expected Outcome Preview"
                        srcDoc={activeExercise.solutionCode}
                        sandbox="allow-scripts"
                        className="w-full h-full border-0 bg-white"
                      />
                      {/* Watermark representing screenshot overlay */}
                      <div className="absolute inset-0 bg-slate-950/5 hover:bg-transparent pointer-events-none transition-all flex items-end p-4">
                        <span className="bg-slate-900/90 text-slate-300 text-[9px] font-mono p-1 px-2 rounded border border-slate-800/40 backdrop-blur-sm">
                          📷 Ảnh Thiết Kế Đạt Chuẩn (Chụp Trực Tiếp)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action launcher footer */}
                  <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl w-full text-center space-y-4">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-200">Bạn đã sẵn sàng lập trình thử nghiệm?</p>
                      <p className="text-[11px] text-slate-500">Mở trình soạn thảo W3Schools "Try It Yourself" để tùy biến giao diện trực tiếp</p>
                    </div>

                    <div className="flex gap-3 justify-center items-center flex-wrap">
                      <button
                        onClick={() => handleToggleCompleteExercise(activeExercise.id)}
                        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          progress.completedExercises.includes(activeExercise.id)
                            ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        {progress.completedExercises.includes(activeExercise.id) ? "Đã Hoàn Thành ✓" : "Đánh Dấu Hoàn Thành"}
                      </button>

                      <button
                        onClick={() => {
                          setIsWorkspaceOpen(true);
                          // trigger preview compilation immediately on open
                          setTimeout(() => {
                            setPreviewKey(p => p + 1);
                          }, 100);
                        }}
                        className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white p-2.5 px-6 rounded-xl text-xs font-bold transition-all shadow-lg shadow-red-950/30 flex items-center gap-2 hover:scale-[1.02] active:scale-95 cursor-pointer border border-red-500/20"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>THỰC HÀNH NGAY (TRY IT YOURSELF) ⚡</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          ) : (
            /* ======================================================== */
            /* TRY IT YOURSELF INTERACTIVE WORKSPACE (IMMERSIVE IDE)    */
            /* ======================================================== */
            <div className="flex-1 flex flex-col overflow-hidden animate-fadeIn">
              
              {/* Workspace Header Toolbar */}
              <div className="bg-slate-950 border-b border-slate-800 px-4 py-3 flex flex-wrap justify-between items-center gap-3 shrink-0">
                
                {/* Back button and info */}
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsWorkspaceOpen(false)}
                    className="bg-slate-900 hover:bg-slate-800 text-slate-300 p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer border border-slate-800"
                    title="Quay lại Giáo Trình"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Quay lại bài học</span>
                  </button>
                  <div className="h-6 w-px bg-slate-800 hidden sm:block" />
                  <div>
                    <h3 className="text-xs font-bold text-white flex items-center gap-1.5 leading-none">
                      <Terminal className="w-3.5 h-3.5 text-red-500" /> 
                      {activeExercise.title}
                    </h3>
                    <p className="text-[10px] text-slate-500 mt-1 hidden sm:block">Chế độ soạn thảo và chạy mã nguồn tương tác</p>
                  </div>
                </div>

                {/* Compile controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowWorkspaceInstructions(!showWorkspaceInstructions)}
                    className={`p-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                      showWorkspaceInstructions 
                        ? "bg-slate-900 border-red-900/60 text-red-400" 
                        : "bg-slate-950 border-slate-850 text-slate-400"
                    }`}
                    title="Ẩn/Hiện đề bài & gợi ý"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{showWorkspaceInstructions ? "Ẩn Đề Bài" : "Hiện Đề Bài"}</span>
                  </button>
                  
                  <button
                    onClick={handleResetCode}
                    className="bg-slate-900 hover:bg-slate-800 text-slate-300 p-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-slate-800"
                    title="Tải lại mã ban đầu"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">Tải lại</span>
                  </button>

                  <button
                    onClick={handleShowSolution}
                    className={`p-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                      isSolutionVisible 
                        ? "bg-emerald-950/50 border-emerald-800 text-emerald-300" 
                        : "bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300"
                    }`}
                    title="Nhập mã đáp án mẫu"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">Đáp Án</span>
                  </button>

                  <button
                    onClick={() => handleCopyCode()}
                    className="bg-slate-900 hover:bg-slate-800 text-slate-300 p-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-slate-800"
                    title="Sao chép toàn bộ mã"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">Sao chép</span>
                  </button>

                  <button
                    onClick={handleRunCode}
                    className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white p-1.5 px-5 rounded-lg text-xs font-bold transition-all shadow-lg shadow-red-950/40 flex items-center gap-1.5 cursor-pointer border border-red-500/20"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>CHẠY MÃ⚡</span>
                  </button>
                </div>
              </div>

              {/* Tag Injection Tool / Quick-insert helpers */}
              <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex gap-1.5 overflow-x-auto text-[10px] shrink-0 items-center scrollbar-thin">
                <span className="text-slate-500 py-1 font-mono font-bold uppercase shrink-0">Tags nhanh:</span>
                <button onClick={() => handleInsertTag("<h1>", "</h1>")} className="bg-slate-950 hover:bg-slate-800 text-slate-300 px-2 py-1 rounded font-mono border border-slate-800 cursor-pointer">&lt;h1&gt;</button>
                <button onClick={() => handleInsertTag("<b>", "</b>")} className="bg-slate-950 hover:bg-slate-800 text-slate-300 px-2 py-1 rounded font-mono border border-slate-800 cursor-pointer">&lt;b&gt;</button>
                <button onClick={() => handleInsertTag("<i>", "</i>")} className="bg-slate-950 hover:bg-slate-800 text-slate-300 px-2 py-1 rounded font-mono border border-slate-800 cursor-pointer">&lt;i&gt;</button>
                <button onClick={() => handleInsertTag('<a href="#" target="_blank">', "</a>")} className="bg-slate-950 hover:bg-slate-800 text-slate-300 px-2 py-1 rounded font-mono border border-slate-800 cursor-pointer">&lt;a&gt;</button>
                <button onClick={() => handleInsertTag('<img src="https://images.unsplash.com/photo-1518770660439-4636190af475" alt="tech" style="max-width:100%; border-radius:8px;">')} className="bg-slate-950 hover:bg-slate-800 text-slate-300 px-2 py-1 rounded font-mono border border-slate-800 cursor-pointer">&lt;img&gt;</button>
                <button onClick={() => handleInsertTag('<div style="background-color:#eee; padding:15px; border-radius:5px;">', "</div>")} className="bg-slate-950 hover:bg-slate-800 text-slate-300 px-2 py-1 rounded font-mono border border-slate-800 cursor-pointer">&lt;div&gt;</button>
                <button onClick={() => handleInsertTag("<table>\n  <tr>\n    <th>Tiêu đề</th>\n    <td>Dữ liệu</td>\n  </tr>\n</table>")} className="bg-slate-950 hover:bg-slate-800 text-slate-300 px-2 py-1 rounded font-mono border border-slate-800 cursor-pointer">&lt;table&gt;</button>
                <button onClick={() => handleInsertTag("<style>\n  body {\n    font-family: sans-serif;\n  }\n</style>")} className="bg-slate-950 hover:bg-slate-800 text-slate-300 px-2 py-1 rounded font-mono border border-slate-800 cursor-pointer">&lt;style&gt;</button>
              </div>

              {/* IDE Main Area */}
              <div className="flex-1 flex flex-col overflow-hidden">
                
                {/* Horizontal Instructions & Reference Panel on top */}
                {showWorkspaceInstructions && (
                  <div className="w-full bg-slate-950 border-b border-slate-800 flex flex-col md:flex-row shrink-0 divide-y md:divide-y-0 md:divide-x divide-slate-800 h-auto md:h-[195px] overflow-hidden">
                    
                    {/* Left Pane: Compact Instructions, Steps, & Hint */}
                    <div className="flex-1 p-3.5 overflow-y-auto flex flex-col md:flex-row gap-4 scrollbar-thin min-w-0">
                      
                      {/* Exercise Description & Hint */}
                      <div className="flex-[4] min-w-[200px] space-y-2">
                        <div className="flex items-center gap-1.5 shrink-0">
                          <Info className="w-3.5 h-3.5 text-red-500" />
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                            HƯỚNG DẪN THỰC HÀNH
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed font-sans">{activeExercise.description}</p>
                        
                        {/* Instructor Code Hint */}
                        <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800 space-y-1 text-[10px]">
                          <span className="font-bold text-amber-400 block uppercase tracking-wider font-mono text-[9px]">Gợi ý từ Giảng Viên:</span>
                          <p className="text-slate-400 leading-relaxed text-[10px]">{exerciseExamples.note}</p>
                          <button 
                            onClick={() => handleCopyCode(exerciseExamples.example)}
                            className="text-red-400 hover:text-red-300 flex items-center gap-1 font-sans font-bold uppercase pt-0.5 text-[9px] cursor-pointer bg-transparent border-0"
                          >
                            <Copy className="w-2.5 h-2.5" /> Chép mẫu ví dụ
                          </button>
                        </div>
                      </div>

                      {/* Steps List */}
                      <div className="flex-[4] min-w-[200px] space-y-2 border-t md:border-t-0 md:border-l border-slate-850 pt-2.5 md:pt-0 md:pl-4">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase font-mono">Các bước thực hiện:</span>
                        <ul className="space-y-1.5">
                          {activeExercise.instructions.map((step, idx) => (
                            <li key={idx} className="flex gap-2 text-[10.5px] leading-relaxed text-slate-300">
                              <span className="w-3.5 h-3.5 bg-red-950 text-red-400 border border-red-900/30 rounded-full flex items-center justify-center shrink-0 font-mono text-[8px] font-bold mt-0.5">
                                {idx + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Quick Status / Finish check */}
                      <div className="flex-[2] min-w-[130px] flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-850 pt-2.5 md:pt-0 md:pl-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-slate-400 block uppercase font-mono">TIẾN ĐỘ:</span>
                          <p className="text-[10px] text-slate-500">Hoàn thành các tiêu chí kỹ thuật trước khi chuyển bài.</p>
                        </div>
                        <div className="pt-2">
                          <button 
                            onClick={() => handleToggleCompleteExercise(activeExercise.id)}
                            className={`w-full flex items-center justify-center gap-1 p-1.5 rounded-md text-[10px] font-bold transition-all cursor-pointer border ${
                              progress.completedExercises.includes(activeExercise.id)
                                ? "bg-emerald-600/25 text-emerald-400 border-emerald-500/30"
                                : "bg-slate-900 hover:bg-slate-850 text-slate-400 border-slate-800"
                            }`}
                          >
                            <Check className="w-3 h-3" />
                            <span>{progress.completedExercises.includes(activeExercise.id) ? "Hoàn Thành ✓" : "Xong"}</span>
                          </button>
                        </div>
                      </div>

                    </div>

                    {/* Right Pane: Expected Product Standard Specimen (Ảnh mẫu) with hover magnifier and magnifying popup */}
                    <div className="w-full md:w-[280px] lg:w-[320px] shrink-0 bg-slate-900 flex flex-col overflow-hidden relative group">
                      <div className="bg-slate-950 px-3 py-1.5 flex items-center justify-between border-b border-slate-800 shrink-0 select-none">
                        <span className="text-[10px] font-bold text-amber-400 uppercase font-mono flex items-center gap-1">
                          <Camera className="w-3.5 h-3.5 text-rose-500" /> SẢN PHẨM MẪU CẦN ĐẠT
                        </span>
                        <button
                          onClick={() => setIsZoomModalOpen(true)}
                          className="text-[9px] font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1 cursor-pointer transition-colors bg-transparent border-0"
                        >
                          <Maximize2 className="w-2.5 h-2.5" /> Phóng To
                        </button>
                      </div>

                      {/* Interactive hover specimen window */}
                      <div 
                        className="flex-1 bg-white relative overflow-hidden"
                        onMouseMove={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          setHoverPosition({ x, y, clientX: e.clientX, clientY: e.clientY });
                        }}
                        onMouseEnter={() => setIsHoveringSpecimen(true)}
                        onMouseLeave={() => setIsHoveringSpecimen(false)}
                      >
                        <iframe
                          key={`workspace-top-sol-${activeExercise.id}`}
                          title="Workspace Expected Specimen Top"
                          srcDoc={activeExercise.solutionCode}
                          sandbox="allow-scripts"
                          className="w-full h-full border-0 bg-white"
                        />

                        {/* Interactive overlay blocks raw pointer events in iframe to enable magnifier hover and clicking to zoom */}
                        <div 
                          onClick={() => setIsZoomModalOpen(true)}
                          className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/20 transition-colors cursor-zoom-in z-10"
                        />

                        {/* Prompt overlay banner */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent p-1.5 pointer-events-none z-20 text-center">
                          <span className="text-white text-[8px] font-mono font-medium px-1 rounded">
                            🔍 Rê chuột để SOI KÍNH LÚP PHÓNG TO
                          </span>
                        </div>

                        {/* Magnifying Glass Lens - floating, rendering the solution code in a bigger, offset scaling */}
                        {isHoveringSpecimen && (
                          <div 
                            className="fixed z-[9999] pointer-events-none border-4 border-rose-500 rounded-xl shadow-2xl bg-white overflow-hidden flex flex-col"
                            style={{
                              width: '320px',
                              height: '240px',
                              left: (hoverPosition.clientX < window.innerWidth - 360 ? hoverPosition.clientX + 20 : hoverPosition.clientX - 340) + 'px',
                              top: Math.max(20, Math.min(window.innerHeight - 260, hoverPosition.clientY - 120)) + 'px',
                              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
                            }}
                          >
                            <div className="bg-rose-600 text-white font-mono font-bold text-[9px] px-2.5 py-1 flex justify-between items-center select-none shrink-0">
                              <span className="flex items-center gap-1">🔍 KÍNH LÚP PHÓNG TO 2.5x</span>
                              <span className="bg-rose-850 px-1.5 rounded text-[8px]">MẪU ĐẠT CHUẨN</span>
                            </div>
                            <div className="flex-1 bg-white relative overflow-hidden">
                              <div 
                                style={{
                                  width: '250%',
                                  height: '250%',
                                  transform: `translate(${-hoverPosition.x * 2.5 + 160}px, ${-hoverPosition.y * 2.5 + 120}px)`,
                                  transformOrigin: 'top left',
                                }}
                                className="absolute"
                              >
                                <iframe
                                  key={`specimen-magnifier-iframe-top-${activeExercise.id}`}
                                  title="Top Specimen Magnifier"
                                  srcDoc={activeExercise.solutionCode}
                                  sandbox="allow-scripts"
                                  className="w-full h-full border-0 pointer-events-none"
                                />
                              </div>
                            </div>
                            <div className="bg-slate-900 text-slate-400 font-mono text-[8px] p-1.5 text-center border-t border-slate-800">
                              Di chuyển chuột trên mẫu để rà soát chi tiết
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                )}

                {/* Horizontal row for Editor and Live Preview */}
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden divide-y md:divide-y-0 md:divide-x divide-slate-800 bg-slate-950">
                  
                  {/* Left Column: Code Editor */}
                  <div className="flex-1 flex flex-col overflow-hidden relative min-h-[200px]">
                    <div className="bg-slate-950/80 px-4 py-2 border-b border-slate-800 text-[10px] text-slate-500 font-mono flex justify-between items-center shrink-0">
                      <span className="font-bold text-slate-400">MÃ NGUỒN CỦA BẠN (HỌC VIÊN SOẠN THẢO)</span>
                      <span>UTF-8</span>
                    </div>
                    
                    <textarea
                      id="code-textarea"
                      value={currentCode}
                      onChange={(e) => setCurrentCode(e.target.value)}
                      placeholder="Nhập mã HTML, CSS hoặc JS của bạn tại đây..."
                      className="flex-1 w-full bg-slate-950 text-slate-200 p-4 font-mono text-xs leading-relaxed border-0 focus:ring-0 focus:outline-none resize-none overflow-y-auto"
                      spellCheck={false}
                    />

                    {/* Complete status banner overlay */}
                    <div className="absolute bottom-4 right-4 bg-slate-900/95 border border-slate-800 p-1.5 px-3 rounded-lg flex items-center gap-2 shadow-xl backdrop-blur-sm">
                      <span className="text-[10px] text-slate-400 font-mono uppercase">Tiến độ bài này:</span>
                      <button 
                        onClick={() => handleToggleCompleteExercise(activeExercise.id)}
                        className={`p-1 px-2 rounded text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                          progress.completedExercises.includes(activeExercise.id)
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                        }`}
                      >
                        <Check className="w-3 h-3" />
                        <span>{progress.completedExercises.includes(activeExercise.id) ? "Đã Hoàn Thành ✓" : "Đánh Dấu Hoàn Thành"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Live Output Preview (Kết quả chạy mã) */}
                  <div className="flex-1 flex flex-col overflow-hidden bg-white min-h-[200px]">
                    <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 text-[10px] text-slate-400 font-mono flex justify-between items-center shrink-0">
                      <span className="flex items-center gap-1.5 font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                        <span>KẾT QUẢ CHẠY MÃ THỰC TẾ (LIVE RUN)</span>
                      </span>
                      <span className="text-slate-500 text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-900 font-sans border border-slate-800">SỐNG</span>
                    </div>
                    
                    <iframe
                      key={previewKey}
                      title="Try It Yourself Live Sandbox"
                      srcDoc={currentCode}
                      sandbox="allow-scripts"
                      className="flex-1 w-full border-0 bg-white"
                    />
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* Zoom & Inspect Design Spec Modal (Multi-Device Simulator) */}
          {isWorkspaceOpen && isZoomModalOpen && (
            <div className="fixed inset-0 bg-slate-950/95 z-[9999] flex flex-col items-center justify-center p-4 md:p-6 backdrop-blur-md">
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl relative">
                
                {/* Modal Header */}
                <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap gap-3 items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-amber-500/10 text-amber-400 rounded border border-amber-500/20">
                      <Camera className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
                        Giả Lập & So Sánh Thiết Kế Đạt Chuẩn
                      </h3>
                      <p className="text-[9px] text-slate-400 font-mono">Bài tập: {activeExercise.title}</p>
                    </div>
                  </div>

                  {/* Device selectors */}
                  <div className="flex bg-slate-900 p-0.5 rounded-lg border border-slate-800 shrink-0">
                    <button
                      onClick={() => setZoomDeviceWidth("desktop")}
                      className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all flex items-center gap-1 cursor-pointer ${
                        zoomDeviceWidth === "desktop"
                          ? "bg-red-700 text-white font-extrabold shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Máy Tính (Desktop)</span>
                    </button>
                    <button
                      onClick={() => setZoomDeviceWidth("tablet")}
                      className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all flex items-center gap-1 cursor-pointer ${
                        zoomDeviceWidth === "tablet"
                          ? "bg-amber-600 text-slate-950 font-extrabold shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <Tablet className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Máy tính bảng</span>
                    </button>
                    <button
                      onClick={() => setZoomDeviceWidth("mobile")}
                      className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all flex items-center gap-1 cursor-pointer ${
                        zoomDeviceWidth === "mobile"
                          ? "bg-rose-600 text-white font-extrabold shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Điện thoại</span>
                    </button>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={() => setIsZoomModalOpen(false)}
                    className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg border border-slate-800 transition-colors cursor-pointer"
                    title="Đóng cửa sổ"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Modal Workspace Area */}
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-950">
                  
                  {/* Left side: Guide / Requirements check */}
                  <div className="w-full md:w-80 bg-slate-900/40 border-b md:border-b-0 md:border-r border-slate-800 p-4 overflow-y-auto flex flex-col gap-4 shrink-0">
                    <div>
                      <span className="text-[10px] font-bold text-amber-400 block uppercase font-mono mb-1">MÔ TẢ BÀI TẬP:</span>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">{activeExercise.description}</p>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-slate-800/60">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase font-mono">TIÊU CHÍ KỸ THUẬT:</span>
                      <ul className="space-y-2">
                        {activeExercise.instructions.map((step, idx) => (
                          <li key={idx} className="flex gap-2 text-xs leading-relaxed text-slate-400">
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto bg-slate-950 p-3 rounded-lg border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                      <span className="font-bold text-rose-450 block font-mono text-[9px] uppercase">💡 MẸO THIẾT KẾ:</span>
                      <p className="leading-relaxed">Thay đổi kích thước giả lập để quan sát cách bố cục co giãn. So sánh font chữ, khoảng cách lề và kích thước phần tử để đạt kết quả chuẩn xác 100%.</p>
                    </div>
                  </div>

                  {/* Right side: Interactive Device Simulator Container */}
                  <div className="flex-1 bg-slate-900/10 p-4 md:p-8 flex items-center justify-center overflow-auto">
                    <div 
                      className="bg-white rounded-xl shadow-2xl border-4 border-slate-950 overflow-hidden flex flex-col transition-all duration-300 relative"
                      style={{
                        width: zoomDeviceWidth === "desktop" ? "100%" : zoomDeviceWidth === "tablet" ? "768px" : "375px",
                        maxWidth: "100%",
                        height: "100%",
                        maxHeight: "600px",
                        boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.8)"
                      }}
                    >
                      {/* Browser Header Bar */}
                      <div className="bg-slate-100 border-b border-slate-200 px-3 py-2 flex items-center gap-1.5 shrink-0 select-none">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        <div className="bg-white text-slate-400 text-[10px] font-mono px-3 py-0.5 rounded border border-slate-200 flex-1 text-center truncate ml-4 flex items-center justify-center gap-1">
                          <span>https://localhost/mau_dat_chuan_da_thiet_bi.html</span>
                          <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1 rounded uppercase scale-90">REF</span>
                        </div>
                      </div>

                      {/* Simulator Frame */}
                      <div className="flex-1 bg-white relative">
                        <iframe
                          key={`zoom-frame-sol-${activeExercise.id}-${zoomDeviceWidth}`}
                          title="Detailed Zoom Specimen"
                          srcDoc={activeExercise.solutionCode}
                          sandbox="allow-scripts"
                          className="w-full h-full border-0 bg-white"
                        />
                      </div>
                    </div>
                  </div>

                </div>

                {/* Modal Footer status banner */}
                <div className="bg-slate-950 border-t border-slate-800 px-4 py-2 text-[10px] text-slate-500 font-mono flex justify-between items-center shrink-0">
                  <span>GIẢ LẬP ĐẠT CHUẨN ĐÃ KÍCH HOẠT</span>
                  <span>Độ rộng màn hình mô phỏng: {zoomDeviceWidth === "desktop" ? "100% (Desktop)" : zoomDeviceWidth === "tablet" ? "768px (Tablet)" : "375px (Mobile)"}</span>
                </div>

              </div>
            </div>
          )}

        </main>

      </div>
    </div>
  );
}
