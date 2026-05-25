"use client";

import { useState, useMemo } from "react";
import { calculateSEOScore } from "@/lib/utils/seoScorer";

export default function AdminBlogPage() {
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [content, setContent] = useState("");
  const [keyword, setKeyword] = useState("");

  const seoResult = useMemo(() => {
    return calculateSEOScore({ title: metaTitle, metaDesc, content, keyword });
  }, [metaTitle, metaDesc, content, keyword]);

  
  return (
    <div className="max-w-4xl">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-headline font-extrabold text-gray-900 mb-2">Buat Artikel Baru</h1>
          <p className="text-gray-500">Tulis konten blog yang dioptimasi untuk SEO On-Page.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold px-6 py-2.5 rounded-xl transition-all">
            Simpan Draft
          </button>
          <button className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-2.5 rounded-xl transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">publish</span>
            Publish Artikel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <div>
              <input 
                type="text" 
                placeholder="Judul Artikel Blog..." 
                className="w-full text-2xl font-headline font-extrabold px-0 py-2 border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 outline-none transition-colors placeholder-gray-300"
              />
            </div>
            
            {/* Fake Rich Text Editor Toolbar */}
            <div className="flex items-center gap-1 border-b border-gray-100 pb-2 text-gray-500">
              <button className="p-1.5 hover:bg-gray-100 rounded-md"><span className="material-symbols-outlined text-[18px]">format_bold</span></button>
              <button className="p-1.5 hover:bg-gray-100 rounded-md"><span className="material-symbols-outlined text-[18px]">format_italic</span></button>
              <button className="p-1.5 hover:bg-gray-100 rounded-md"><span className="material-symbols-outlined text-[18px]">format_list_bulleted</span></button>
              <div className="w-px h-5 bg-gray-200 mx-1"></div>
              <button className="p-1.5 hover:bg-gray-100 rounded-md"><span className="material-symbols-outlined text-[18px]">add_photo_alternate</span></button>
              <button className="p-1.5 hover:bg-gray-100 rounded-md"><span className="material-symbols-outlined text-[18px]">link</span></button>
            </div>

            <textarea 
              rows={15} 
              placeholder="Mulai menulis konten di sini..." 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-0 py-4 border-0 focus:ring-0 outline-none resize-y text-gray-700 leading-relaxed font-body"
            />
          </div>
        </div>

        {/* Right Column: SEO & Meta */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">image</span>
              Featured Image
            </div>
            <div className="aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-colors cursor-pointer mb-4">
              <span className="material-symbols-outlined text-3xl mb-2">upload</span>
              <span className="text-xs font-bold">Upload Gambar</span>
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-500 block mb-1">Alt Text (SEO)</label>
              <input type="text" placeholder="Deskripsi gambar..." className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-primary outline-none" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">search</span>
              SEO On-Page
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-bold text-gray-500">Meta Title</label>
                  <span className={`text-[10px] font-bold ${metaTitle.length > 60 ? 'text-red-500' : 'text-gray-400'}`}>
                    {metaTitle.length}/60
                  </span>
                </div>
                <input 
                  type="text" 
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className={`w-full px-3 py-2 text-sm rounded-lg border ${metaTitle.length > 60 ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-primary'} outline-none`} 
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-bold text-gray-500">Meta Description</label>
                  <span className={`text-[10px] font-bold ${metaDesc.length > 155 ? 'text-red-500' : 'text-gray-400'}`}>
                    {metaDesc.length}/155
                  </span>
                </div>
                <textarea 
                  rows={3} 
                  value={metaDesc}
                  onChange={(e) => setMetaDesc(e.target.value)}
                  className={`w-full px-3 py-2 text-sm rounded-lg border ${metaDesc.length > 155 ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-primary'} outline-none`} 
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-500 block mb-1">Canonical URL (Opsional)</label>
                <input type="text" placeholder="https://..." className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-500 block mb-1">Target Keyword Utama</label>
                <input 
                  type="text" 
                  placeholder="Masukkan 1 keyword utama" 
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-primary outline-none" 
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="font-bold text-gray-800 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">speed</span>
                SEO Scorecard
              </div>
              <div className={`text-lg font-black ${seoResult.score >= 80 ? 'text-green-500' : seoResult.score >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                {seoResult.score}/100
              </div>
            </div>
            
            <div className="space-y-3 mt-4">
              {seoResult.checks.map((check) => (
                <div key={check.id} className="flex gap-2 items-start text-sm">
                  <span className={`material-symbols-outlined text-[18px] shrink-0 ${check.passed ? 'text-green-500' : 'text-red-500'}`}>
                    {check.passed ? 'check_circle' : 'cancel'}
                  </span>
                  <div>
                    <div className="font-bold text-gray-800 text-xs">{check.label}</div>
                    <div className="text-gray-500 text-[11px] leading-snug">{check.message}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
