'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Product } from '@/types/product';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function ProductDetails({ product }: { product: Product }) {
  return (
    <Card className="shadow-none">
      <CardContent>
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="reviews">
            <AccordionTrigger className="text-lg font-semibold">
              Comentarios
            </AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="space-y-2">
                {product.reviews.length > 0 ? (
                  product.reviews.map((review) => (
                    <AccordionItem
                      key={review.id}
                      value={`review-${review.id}`}
                    >
                      <AccordionTrigger>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-medium">
                            User {review.user_id}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">
                          {review.review_text}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))
                ) : (
                  <span className="mx-auto text-muted-foreground">
                    No hay comentarios aún
                  </span>
                )}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
