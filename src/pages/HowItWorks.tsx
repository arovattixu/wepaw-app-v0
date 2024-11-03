import React from 'react';
import { ShoppingBag, Users, Clock, CreditCard } from 'lucide-react';

const steps = [
  {
    icon: ShoppingBag,
    title: 'Find Products',
    description: 'Browse our selection of premium pet supplies at regular retail prices.'
  },
  {
    icon: Users,
    title: 'Join a Group',
    description: 'Join an existing group or start a new one to unlock wholesale prices.'
  },
  {
    icon: Clock,
    title: 'Wait for Group to Fill',
    description: 'Share with other pet parents. Groups must fill within 24 hours.'
  },
  {
    icon: CreditCard,
    title: 'Complete Purchase',
    description: 'Once the group is full, complete your purchase at the discounted price.'
  }
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How WePaw Works</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join other pet parents to unlock wholesale prices on premium pet supplies. Save up to 40% on every purchase.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full border-t-2 border-dashed border-red-200 -z-10" />
              )}
              <div className="bg-white rounded-xl p-6 text-center relative">
                <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-red-600" />
                </div>
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-red-50 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6 text-left">
              <div>
                <h3 className="text-lg font-semibold mb-2">How much can I save?</h3>
                <p className="text-gray-600">Members typically save between 20-40% off retail prices when joining group purchases.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">What happens if the group doesn't fill?</h3>
                <p className="text-gray-600">If a group doesn't reach its member goal within 24 hours, you can either join another group or purchase at the regular price.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Is there a membership fee?</h3>
                <p className="text-gray-600">No! WePaw is completely free to join and use. You only pay for the products you purchase.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">How is shipping handled?</h3>
                <p className="text-gray-600">We offer free shipping on all group purchases. Individual purchases over $49 also qualify for free shipping.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}