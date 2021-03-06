package com.poseidon.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import com.poseidon.domain.OrderItem;
import com.poseidon.domain.*; // for static metamodels
import com.poseidon.repository.OrderItemRepository;
import com.poseidon.service.dto.OrderItemCriteria;


/**
 * Service for executing complex queries for OrderItem entities in the database.
 * The main input is a {@link OrderItemCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link OrderItem} or a {@link Page} of {@link OrderItem} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class OrderItemQueryService extends QueryService<OrderItem> {

    private final Logger log = LoggerFactory.getLogger(OrderItemQueryService.class);

    private final OrderItemRepository orderItemRepository;

    public OrderItemQueryService(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

    /**
     * Return a {@link List} of {@link OrderItem} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<OrderItem> findByCriteria(OrderItemCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<OrderItem> specification = createSpecification(criteria);
        return orderItemRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link OrderItem} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<OrderItem> findByCriteria(OrderItemCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<OrderItem> specification = createSpecification(criteria);
        return orderItemRepository.findAll(specification, page);
    }

    /**
     * Function to convert OrderItemCriteria to a {@link Specification}
     */
    private Specification<OrderItem> createSpecification(OrderItemCriteria criteria) {
        Specification<OrderItem> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), OrderItem_.id));
            }
            if (criteria.getQuantity() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getQuantity(), OrderItem_.quantity));
            }
            if (criteria.getTotalPrice() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getTotalPrice(), OrderItem_.totalPrice));
            }
            if (criteria.getStatus() != null) {
                specification = specification.and(buildSpecification(criteria.getStatus(), OrderItem_.status));
            }
            if (criteria.getProductId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getProductId(), OrderItem_.product, Product_.id));
            }
            if (criteria.getOrderId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getOrderId(), OrderItem_.order, ProductOrder_.id));
            }
        }
        return specification;
    }

}
