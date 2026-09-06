import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DemoStep,
  MaintenanceRequest,
  CrewContributionState,
  DisruptionPauseState,
  BundledBlockInfo,
} from '../types';
import {
  DEMO_STEPS,
  INITIAL_REQUESTS,
  INITIAL_CREW_CONTRIBUTION_STATE,
  INITIAL_DISRUPTION_PAUSE_STATE,
  BUNDLED_BLOCK_INFO,
} from '../data/mockData';

interface SimulationContextType {
  currentStep: DemoStep;
  stepNumber: number;
  requests: MaintenanceRequest[];
  activeNav: string;
  setActiveNav: (nav: string) => void;
  isAutoPlay: boolean;
  toggleAutoPlay: () => void;
  isNewRequestModalOpen: boolean;
  setIsNewRequestModalOpen: (open: boolean) => void;
  goToStep: (step: DemoStep | number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetDemo: () => void;
  addRequest: (newReq: {
    department: 'Civil' | 'S&T' | 'Electrical';
    section: string;
    work: string;
    duration: number;
    priority: 'High' | 'Medium' | 'Low';
    description?: string;
    crewName?: string;
  }) => void;
  crewContribution: CrewContributionState;
  disruptionState: DisruptionPauseState;
  bundledBlockInfo: BundledBlockInfo;
  isBundled: boolean;
  isContributorActive: boolean;
  isDisruptionActive: boolean;
  // Step shortcut triggers
  triggerShadowBundling: () => void;
  triggerContributorMode: () => void;
  triggerInjectDelay: () => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<DemoStep>('01_NEW_REQUEST');
  const [requests, setRequests] = useState<MaintenanceRequest[]>(INITIAL_REQUESTS);
  const [activeNav, setActiveNav] = useState<string>('command');
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
  const [isNewRequestModalOpen, setIsNewRequestModalOpen] = useState<boolean>(false);

  const [crewContribution] = useState<CrewContributionState>(INITIAL_CREW_CONTRIBUTION_STATE);
  const [disruptionState] = useState<DisruptionPauseState>(INITIAL_DISRUPTION_PAUSE_STATE);
  const [bundledBlockInfo] = useState<BundledBlockInfo>(BUNDLED_BLOCK_INFO);

  const stepNumber =
    currentStep === '01_NEW_REQUEST'
      ? 1
      : currentStep === '02_SHADOW_BUNDLING'
      ? 2
      : currentStep === '03_CREW_CONTRIBUTION'
      ? 3
      : 4;

  const isBundled = stepNumber >= 2;
  const isContributorActive = stepNumber >= 3;
  const isDisruptionActive = stepNumber === 4;

  // Auto-play timer for presentation mode
  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setTimeout(() => {
      if (currentStep === '01_NEW_REQUEST') {
        setCurrentStep('02_SHADOW_BUNDLING');
      } else if (currentStep === '02_SHADOW_BUNDLING') {
        setCurrentStep('03_CREW_CONTRIBUTION');
      } else if (currentStep === '03_CREW_CONTRIBUTION') {
        setCurrentStep('04_INJECT_DELAY');
      } else if (currentStep === '04_INJECT_DELAY') {
        setIsAutoPlay(false);
      }
    }, 4500);

    return () => clearTimeout(timer);
  }, [isAutoPlay, currentStep]);

  // Keep request statuses synchronized with the simulation step
  useEffect(() => {
    setRequests((prev) =>
      prev.map((req) => {
        if (req.section.startsWith('S2') && req.compatibleWith && req.compatibleWith.length > 0) {
          if (stepNumber === 1) {
            return { ...req, status: 'Pending' };
          } else if (stepNumber === 2) {
            return { ...req, status: 'Bundled' };
          } else if (stepNumber === 3) {
            return { ...req, status: req.id === 'M004' ? 'Paused' : 'In Progress' };
          } else {
            // step 4
            return { ...req, status: 'Paused' };
          }
        }
        return req;
      })
    );
  }, [stepNumber]);

  const goToStep = (step: DemoStep | number) => {
    if (typeof step === 'number') {
      const target = DEMO_STEPS.find((s) => s.stepNumber === step);
      if (target) setCurrentStep(target.id);
    } else {
      setCurrentStep(step);
    }
  };

  const nextStep = () => {
    if (stepNumber < 4) {
      goToStep(stepNumber + 1);
    }
  };

  const prevStep = () => {
    if (stepNumber > 1) {
      goToStep(stepNumber - 1);
    }
  };

  const resetDemo = () => {
    setCurrentStep('01_NEW_REQUEST');
    setIsAutoPlay(false);
    setRequests(INITIAL_REQUESTS);
  };

  const addRequest = (newReq: {
    department: 'Civil' | 'S&T' | 'Electrical';
    section: string;
    work: string;
    duration: number;
    priority: 'High' | 'Medium' | 'Low';
    description?: string;
    crewName?: string;
  }) => {
    const id = `M0${Math.floor(20 + Math.random() * 80)}`;
    const createdRequest: MaintenanceRequest = {
      id,
      ...newReq,
      status: 'Pending',
      submittedAt: 'Just now',
      compatibleWith: newReq.section.startsWith('S2') ? ['M001', 'M004', 'M007'] : [],
    };
    setRequests((prev) => [createdRequest, ...prev]);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay((prev) => !prev);
  };

  const triggerShadowBundling = () => {
    setCurrentStep('02_SHADOW_BUNDLING');
  };

  const triggerContributorMode = () => {
    setCurrentStep('03_CREW_CONTRIBUTION');
  };

  const triggerInjectDelay = () => {
    setCurrentStep('04_INJECT_DELAY');
  };

  return (
    <SimulationContext.Provider
      value={{
        currentStep,
        stepNumber,
        requests,
        activeNav,
        setActiveNav,
        isAutoPlay,
        toggleAutoPlay,
        isNewRequestModalOpen,
        setIsNewRequestModalOpen,
        goToStep,
        nextStep,
        prevStep,
        resetDemo,
        addRequest,
        crewContribution,
        disruptionState,
        bundledBlockInfo,
        isBundled,
        isContributorActive,
        isDisruptionActive,
        triggerShadowBundling,
        triggerContributorMode,
        triggerInjectDelay,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = (): SimulationContextType => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
