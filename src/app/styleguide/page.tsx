"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Pill } from "@/components/ui/Pill";
import { Slider } from "@/components/ui/Slider";
import { Mono } from "@/components/ui/Mono";
import { Banner } from "@/components/ui/Banner";
import { Icons } from "@/components/ui/Icons";

export default function StyleGuide() {
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(true);
  const [sliderVal, setSliderVal] = useState(70);
  const [pills, setPills] = useState(["Product Strategy", "UX Design", "AI Automation"]);
  const [cardOpen] = useState(true);

  return (
    <div className="min-h-screen bg-bg p-8 font-sans">
      <div className="mx-auto max-w-[700px]">
        <h1 className="text-2xl font-extrabold mb-1">IdeaForge Style Guide</h1>
        <p className="text-sm text-text-secondary mb-8">
          All UI primitives in their different states.
        </p>

        {/* Buttons */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-text-muted uppercase tracking-wide mb-3">
            Buttons
          </h2>
          <div className="rounded-[var(--radius-card)] border border-border bg-card p-5">
            <div className="flex flex-wrap gap-2 mb-4">
              <Button>Default</Button>
              <Button variant="primary">Primary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="success">Success</Button>
              <Button active>Active</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button small>Small Default</Button>
              <Button small variant="primary">Small Primary</Button>
              <Button small variant="ghost">Small Ghost</Button>
              <Button small active>Small Active</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <Button><Icons.Plus /> With Icon</Button>
              <Button variant="primary"><Icons.Play /> Run</Button>
              <Button small><Icons.Download /> Download</Button>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-text-muted uppercase tracking-wide mb-3">
            Cards
          </h2>
          <div className="flex flex-col gap-3">
            <Card title="Default Card" icon={<Icons.Settings />}>
              <p className="text-xs text-text-secondary">Card content goes here.</p>
            </Card>
            <Card
              title="With Badge"
              icon={<Icons.Heart />}
              badge={{ text: "3 active", bg: "#fce7f3", color: "#9d174d" }}
            >
              <p className="text-xs text-text-secondary">Card with a pink badge.</p>
            </Card>
            <Card
              title="Collapsed by Default"
              icon={<Icons.Layers />}
              badge={{ text: "100%", bg: "#ecfdf5", color: "#065f46" }}
              defaultCollapsed
            >
              <p className="text-xs text-text-secondary">This card starts collapsed.</p>
            </Card>
          </div>
        </section>

        {/* Checkboxes */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-text-muted uppercase tracking-wide mb-3">
            Checkboxes
          </h2>
          <div className="rounded-[var(--radius-card)] border border-border bg-card p-5">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Checkbox checked={checked1} onChange={() => setChecked1(!checked1)} color="#2563eb" />
                <span className="text-xs">Education (blue)</span>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox checked={checked2} onChange={() => setChecked2(!checked2)} color="#059669" />
                <span className="text-xs text-[#bbb]">Unchecked (green)</span>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox checked={checked3} onChange={() => setChecked3(!checked3)} color="#db2777" />
                <span className="text-xs">Principles (pink)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pills */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-text-muted uppercase tracking-wide mb-3">
            Pills
          </h2>
          <div className="rounded-[var(--radius-card)] border border-border bg-card p-5">
            <div className="flex flex-wrap gap-2 mb-3">
              {pills.map((p) => (
                <Pill key={p} text={p} color="#2563eb" onRemove={() => setPills(pills.filter(x => x !== p))} />
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <Pill text="Digital" color="#2563eb" />
              <Pill text="Solo+AI" color="#7c3aed" />
              <Pill text="AI-native" color="#059669" />
              <Pill text="Crypto" color="#dc2626" onRemove={() => {}} />
            </div>
          </div>
        </section>

        {/* Sliders */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-text-muted uppercase tracking-wide mb-3">
            Sliders
          </h2>
          <div className="rounded-[var(--radius-card)] border border-border bg-card p-5">
            <Slider label="Novelty" value={sliderVal} min={0} max={100} onChange={setSliderVal} suffix="%" accentColor={sliderVal >= 70 ? "#059669" : "#ea580c"} />
            <Slider label="Ideas per run" value={15} min={5} max={30} onChange={() => {}} />
            <Slider label="Deck cutoff" value={80} min={60} max={95} onChange={() => {}} suffix="%" />
          </div>
        </section>

        {/* Mono */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-text-muted uppercase tracking-wide mb-3">
            Mono
          </h2>
          <div className="rounded-[var(--radius-card)] border border-border bg-card p-5 flex gap-6">
            <Mono>15</Mono>
            <Mono color="#059669">70%</Mono>
            <Mono color="#ea580c">$5,000</Mono>
            <Mono color="#2563eb" size="18px">1.5x</Mono>
          </div>
        </section>

        {/* Banners */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-text-muted uppercase tracking-wide mb-3">
            Banners
          </h2>
          <div className="flex flex-col gap-3">
            <Banner />
            <Banner message="Excluded — simplified generation without personas." />
            <Banner message="This section provides context." variant="info" />
          </div>
        </section>

        {/* Icons */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-text-muted uppercase tracking-wide mb-3">
            Icons
          </h2>
          <div className="rounded-[var(--radius-card)] border border-border bg-card p-5">
            <div className="flex flex-wrap gap-4 text-text-secondary">
              {Object.entries(Icons).map(([name, Icon]) => (
                <div key={name} className="flex flex-col items-center gap-1">
                  <Icon />
                  <span className="text-[9px] text-text-muted">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Colors */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-text-muted uppercase tracking-wide mb-3">
            Colors
          </h2>
          <div className="rounded-[var(--radius-card)] border border-border bg-card p-5">
            <div className="grid grid-cols-4 gap-2">
              {[
                ["bg", "#f5f6f8"], ["card", "#ffffff"], ["border", "#e5e7eb"], ["text", "#1a1a1a"],
                ["secondary", "#555555"], ["muted", "#999999"], ["active", "#1a1a1a"], ["success", "#059669"],
                ["warning", "#ea580c"], ["error", "#dc2626"], ["education", "#2563eb"], ["health", "#059669"],
                ["seniors", "#7c3aed"], ["consumer", "#db2777"], ["b2b", "#ea580c"], ["wildcard", "#64748b"],
              ].map(([name, hex]) => (
                <div key={name} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded border border-border" style={{ backgroundColor: hex }} />
                  <div>
                    <div className="text-[10px] font-semibold">{name}</div>
                    <div className="text-[9px] font-mono text-text-muted">{hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-text-muted uppercase tracking-wide mb-3">
            Typography
          </h2>
          <div className="rounded-[var(--radius-card)] border border-border bg-card p-5">
            <p className="font-sans text-2xl font-extrabold mb-2">DM Sans — 800 ExtraBold</p>
            <p className="font-sans text-lg font-bold mb-2">DM Sans — 700 Bold</p>
            <p className="font-sans text-base font-semibold mb-2">DM Sans — 600 Semibold</p>
            <p className="font-sans text-sm font-medium mb-2">DM Sans — 500 Medium</p>
            <p className="font-sans text-sm font-normal mb-4">DM Sans — 400 Regular</p>
            <p className="font-mono text-sm mb-1">JetBrains Mono — Regular</p>
            <p className="font-mono text-sm font-semibold">JetBrains Mono — 600 Semibold</p>
          </div>
        </section>
      </div>
    </div>
  );
}
